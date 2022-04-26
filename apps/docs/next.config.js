const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: '@mdx-js/react',
    remarkPlugins: [require('remark-prism')],
  },
})

module.exports = withMDX({
  reactStrictMode: true,
  basePath: '/open-source/css-gui',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
})
