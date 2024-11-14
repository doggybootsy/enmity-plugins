import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import dns from "node:dns/promises";
import os from "node:os";
import { WebSocketServer, type WebSocket } from "ws";

let url: URL;

const websockets = new Map<number, { socket: WebSocket, debugger?: WebSocket, messages: ({type: string } & { [key in string]: any })[] }>();

const server = http.createServer(async (req, res) => {
  const route = new URL(req.url || "", url);

  console.log(`Serving ${route.href}`);
  
  const filepath = path.resolve(`.${route.pathname}`);

  const writeHead = (statusCode: number, headers?: http.OutgoingHttpHeaders | http.OutgoingHttpHeader[]) => res.writeHead(statusCode, http.STATUS_CODES[statusCode], headers);

  if (route.pathname === "/") {
    const html = Buffer.from(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DoggyBootsy server</title>
</head>
<body>
  <div>Plugins</div>
  ${(await fs.promises.readdir(path.resolve("./dist"))).filter(m => m.endsWith(".js")).map(m => `<a href="${new URL(`/dist/${m}`, url)}">${m}</a>`)}
  ${websockets.size ? `<div>Debugger</div>${Array.from(websockets.keys()).map(m => `<a href="${new URL(`/debug?id=${m}`, url)}">${m}</a>`)}` : ""}
</body>
</html>`, "utf-8");

    writeHead(200, {
      "Content-Type": "text/html",
      "Content-Size": Buffer.byteLength(html)
    });

    res.write(html);

    res.end();
    
    return;
  }
  if (route.pathname === "/debug") {    
    const id = route.searchParams.get("id");
    
    if (!id || !websockets.has(Number(id)) || websockets.get(Number(id))!.debugger) {

      const html = Buffer.from(`<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    </head>
    <body>404 path <strong>${route.href}</strong> is unknown!</body>
    </html>`, "utf-8");
    
      writeHead(404, {
        "Content-Type": "text/html",
        "Content-Size": Buffer.byteLength(html)
      });
    
      res.write(html);
    
      res.end();
      
      return;
    }

    const html = Buffer.from(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DoggyBootsy server</title>
  <style>
    #logs > div {
      white-space: pre;
    }
  </style>
</head>
<body>
  <div>Debugging ${id}</div>
  <div id="logs"></div>
  <textarea id="code" name="code" rows="4" cols="50"></textarea>
  <button id="run" type="button">Run</button>
  <script>
    for (const { message } of ${JSON.stringify(websockets.get(Number(id))?.messages)} || []) {
      const log = document.createElement("div");

      try {
        const json = JSON.parse(message);

        if (typeof json.level === "number" && typeof json.message === "string") {
          log.append(
            document.createTextNode(\`[\${new Date().toISOString()}] System Log \${json.level}\`),
            document.createTextNode("\\n"),
            document.createTextNode(json.message)
          );
        }
      }
      finally {
        if (!log.innerHTML.length) {
          log.textContent = message;
        }
        
        logs.append(log);
      }
    }
  </script>
  <script>
    const ws = new WebSocket(${JSON.stringify(route.href)}.replace(/^http/, "ws"));

    run.onclick = () => {
      if (!code.value) return;

      ws.send(JSON.stringify({type: "eval", code: code.value}));
      code.value = "";
    }
  </script>
</body>
</html>`, "utf-8");
    
    writeHead(200, {
      "Content-Type": "text/html",
      "Content-Size": Buffer.byteLength(html)
    });

    res.write(html);

    res.end();

    return;
  }
  if (route.pathname.startsWith("/dist/") && fs.existsSync(filepath)) {
    const data = await fs.promises.readFile(filepath);

    writeHead(200, {
      "Content-Type": "text/javascript",
      "Content-Size": Buffer.byteLength(data)
    });

    res.write(data);

    res.end();

    return;
  }

  const html = Buffer.from(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
</head>
<body>404 path <strong>${route.href}</strong> is unknown!</body>
</html>`, "utf-8");

  writeHead(404, {
    "Content-Type": "text/html",
    "Content-Size": Buffer.byteLength(html)
  });

  res.write(html);

  res.end();
});

let $id = 0;
const wss = new WebSocketServer({ server });

wss.on("connection", (socket, req) => {
  const route = new URL(req.url || "", url.href.replace(/^http/, "ws"));

  console.log(`Connecting ${route.href}`);

  if (route.pathname === "/debug") {
    const id = route.searchParams.get("id");
    if (!id || !websockets.has(Number(id)) || websockets.get(Number(id))!.debugger) {
      socket.close(0x1, "Unable to debug!");
      return;
    }

    websockets.get(Number(id))!.debugger = socket;

    socket.on("message", (data) => {      
      const message = JSON.parse(data.toString());

      if (message.type === "eval") {
        websockets.get(Number(id))!.socket.send(message.code);
      }
    });

    return;
  }
  
  const id = $id++;

  websockets.set(id, { socket, messages: [] });

  socket.on("close", (code, reason) => {
    const data = websockets.get(id)!;

    if (data.debugger) {
      data.debugger.close(code, reason);
    }

    websockets.delete(id);
  });

  socket.on("error", (err) => {
    const data = websockets.get(id)!;

    if (data.debugger) {
      data.debugger.send(JSON.stringify({ type: "error", error: err }));
    }

    data.messages.push({ type: "error", error: err });
  });

  socket.on("message", (message) => {
    const data = websockets.get(id)!;

    if (data.debugger) {
      data.debugger.send(JSON.stringify({ type: "message", message }));
    }

    data.messages.push({ type: "message", message: message.toString() });
  });

  socket.on("unexpected-response", () => {
    socket.close(0x1, "unexpected-response");
  });
});

dns.lookup(os.hostname(), 4).then(({ address }) => {
  const PORT = process.env.PORT || "8080";
  
  server.listen(Number(PORT), address, () => {
    url = new URL(`http://${address}:${PORT}/`);

    console.log(`Serving at ${url.href}`);
  });
});
