module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true
  },
  extends: "eslint:recommended",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    db: true
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {}
};