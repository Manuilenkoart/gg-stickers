const path = require('path')

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

module.exports = {
  '*/.(ts|tsx)': () => 'npm run type-check',
  '*.{js,jsx,ts,tsx,json,md,prettierrc,css,scss}':
    'npm run prettier',
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
}