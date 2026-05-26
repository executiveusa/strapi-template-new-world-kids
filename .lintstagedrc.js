module.exports = {
  // apps/blog uses @dg-scripts/eslint-config (singleQuote) which conflicts with
  // the root @repo/eslint-config Prettier (singleQuote: false). Exclude blog
  // files here; they are linted by their own package script in CI.
  "!(apps/blog/**)*.{js,jsx,ts,tsx}": ["eslint --fix"],
  "apps/blog/**/*.{js,jsx,ts,tsx}": [],
  "*.{md,css,scss}": ["prettier --write"],
}
