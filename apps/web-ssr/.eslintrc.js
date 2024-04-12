module.exports = {
  extends: [
    "next/core-web-vitals",
    "../../.eslintrc.js",
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
}
