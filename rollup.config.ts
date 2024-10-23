// @ts-expect-error
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";
import json from "@rollup/plugin-json";

import { defineConfig } from "rollup";
import { resolve } from "path";
import replace from "@rollup/plugin-replace";
import typescriptPaths from "rollup-plugin-typescript-paths";
import alias from "@rollup/plugin-alias";
import { readdirSync } from "fs";

const manifest = require(`./packages/${process.env.PACKAGE}/manifest.json`);

export default defineConfig({
  input: resolve(`./packages/${process.env.PACKAGE}/src/index.tsx`),
  output: [
    {
      file: `dist/${process.env.PACKAGE}.js`,
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
    alias({
      entries: [
        {
          find: "react",
          replacement: resolve("./packages/fake_node_modules/react.ts")
        }
      ]
    }),
    replace({
      preventAssignment: true,
      __lib_meta_data__: JSON.stringify({
        id: process.env.PACKAGE,
        manifest,
        invite: "yYJA3qQE5F"
      }),
      __doggy_dev_data__: JSON.stringify({
        plugins: readdirSync("./dist").map((value) => ({
          ...require(`./packages/${value.slice(0, -3)}/manifest.json`),
          name: value.slice(0, -3)
        }))
      })
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
