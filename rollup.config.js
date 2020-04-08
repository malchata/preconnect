/* eslint-env node */
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const commonTerserOptions = {
  timings: true,
  compress: {
    sequences: true,
    conditionals: true,
    evaluate: true,
    unsafe_arrows: true,
    warnings: true
  }
};

export default [
  // ES6 build
  {
    input: pkg.module,
    output: {
      file: "dist/preconnect.min.mjs",
      format: "esm"
    },
    plugins: [
      terser({
        ecma: 8,
        mangle: {
          keep_fnames: true,
          toplevel: true,
          reserved: ["preconnect"],
          module: true
        },
        ...commonTerserOptions
      })
    ]
  },
  // Optimized ES5 build for browsers
  {
    input: pkg.module,
    output: {
      name: "preconnect",
      file: "dist/preconnect.min.js",
      format: "iife"
    },
    plugins: [
      babel({
        presets: [
          [
            "@babel/preset-env", {
              targets: "ie 11",
              loose: true
            }
          ]
        ]
      }),
      terser({
        ecma: 5,
        mangle: {
          keep_fnames: true,
          toplevel: true,
          reserved: ["preconnect"],
          module: false
        },
        ...commonTerserOptions
      })
    ]
  },
  // CommonJS build
  {
    input: pkg.module,
    output: {
      file: pkg.main,
      format: "cjs"
    }
  }
];
