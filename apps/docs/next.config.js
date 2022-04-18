const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

module.exports = withMDX({
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
})
