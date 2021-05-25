import { terser } from "rollup-plugin-terser";

export default {
  input: "src/main.js",
  output: [
    {
      file: "assets/js/min.js",
      format: "iife",
      sourcemap: true,
      plugins: [terser()],
    },
  ],
};
