module.exports = {
  singleQuote: true,
  semi: true,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'always',
  tabWidth: 2,
  useTabs: false,
  printWidth: 80,
  importOrder: [
    '^((@tanstack|@storybook)/(.*)|next|react)$',
    '<THIRD_PARTY_MODULES>',
    '^@(mantine|tabler)/(.*)$',
    '(@testing-library/(.*)|whatwg-fetch)$',
    '^@(auth|shared)/(.*)$',
    '^[./]',
    '^[../]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,

  // Fix issue pretty-import not working on pnpm
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
};
