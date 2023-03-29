/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  semi: false,
  printWidth: 80,
  trailingComma: "es5",
  singleQuote: true,
}

module.exports = config
