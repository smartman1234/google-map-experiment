# Location Project

- related technologies:
  <a href="https://vitejs.dev/guide/#scaffolding-your-first-vite-project">vite</a> - project starter
  <a href="https://reactjs.org/">react</a> - UI framework
  <a href="https://ant.design/">Ant Design</a> - UI component library
  <a href="https://www.typescriptlang.org/">Typescript</a> - Programming Language
  React Goolge Maps - Typescript Map library : https://www.npmjs.com/package/@react-google-maps/api

- related api:
  <a href="https://developers.google.com/maps/documentation/javascript/get-api-key">Google Api Key</a> - For Map Access
  <a href="https://positionstack.com/documentation">Position Stack</a> - For address query
  <a href="https://ipgeolocation.io/">ipgeolocation.io</a> - For Time Zone Api

## How to run locally

### API

0. Create a .env file which copy from .env.example, input your key first
1. Run `yarn` or `npm install`to install deps
2. Run `yarn dev` or `npm run dev` to start server
3. Go to `localhost:3000`

Deploy notes:

add this code in index.html

```html
<script>
      var global = global || window;
      var Buffer = Buffer || [];
      var process = process || { env: { DEBUG: undefined }, version: [] };
</script>
```
add this code in main.js / main.ts

```js
import { Amplify } from "aws-amplify";

Amplify.configure({});
```
add this code in vite.config.js

```js
import resolve from "@rollup/plugin-node-resolve";
import { visualizer } from "rollup-plugin-visualizer";

export default ({ mode }) => {
  ...,
  return defineConfig({
    plugins: [
      react(),
      {
        ...resolve({
          preferBuiltins: false,
          browser: true,
        }),
        enforce: "pre",
        apply: "build",
      },
      visualizer(),
    ],
    define: {...},
  });
};
```
Last, look carefully into the yaml file at amplify, especially in the yaml file of baseDir path
