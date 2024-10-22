// @ts-expect-error
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";
import json from "@rollup/plugin-json";

import { defineConfig } from "rollup";
import { resolve } from "path";
import replace from "@rollup/plugin-replace";
import typescriptPaths from "rollup-plugin-typescript-paths";

const manifest = require(`./packages/${process.env.PACKAGE}/manifest.json`);

export default defineConfig({
  input: resolve(`./packages/${process.env.PACKAGE}/src/index.tsx`),
  output: [
    {
      file: `dist/${manifest.name}.js`,
      format: "cjs",
      strict: false
    }
  ],
  plugins: [
    {
      name: "create-jsx",
      renderChunk(code) {
        // Here we inject the local variable declaration at the start of the code
        const injection = `const __jsx__ = Object.assign((...args) => window.enmity.modules.common.React.createElement(...args), window.enmity.modules.common.React);\n`;
        return injection + code; // Prepend the injected code to the existing chunk
      },
    },
    replace({
      preventAssignment: true,
      "process.env.DISCORD_INVITE": JSON.stringify("yYJA3qQE5F")
    }),
    typescriptPaths({
      preserveExtensions: true
    }),
    esbuild({
      minify: true, 
      target: "ES2019"
    }),
    nodeResolve({
      extensions: [ ".tsx", ".ts", ".jsx", ".js" ]
    }),
    commonjs(),
    json(),
  ]
});
