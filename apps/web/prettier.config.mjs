/** @type {import("prettier").Config} */
const config = {
  semi: false,
  singleQuote: true,
  tailwindFunctions: ['clsx', 'tw'],
  plugins: ['prettier-plugin-tailwindcss'],
}

export default config
