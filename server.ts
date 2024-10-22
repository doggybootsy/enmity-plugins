import { createServer, STATUS_CODES } from "node:http";
import { hostname } from "node:os";
import { lookup } from "node:dns";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const server = createServer((req, res) => {
  try {
    const file = readFileSync(resolve("dist", req.url!.slice(1)));
    res.writeHead(200, STATUS_CODES[200], {
      "Content-Type": "text/javascript"
    });

    console.log(req.url!.slice(1));

    res.end(file);
  } catch (error) {
    res.writeHead(404, STATUS_CODES[404]);
    res.end("err 404");
  }
});

lookup(hostname(), 4, (err, address) => {  
  server.listen(9091, address, () => {
    console.log(`http://${address}:9091/`);
  });
});