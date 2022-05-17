import nextMDX from '@next/mdx'
import remarkGFM from 'remark-gfm'
import remarkPrism from 'remark-prism'

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: '@mdx-js/react',
    remarkPlugins: [remarkGFM, remarkPrism],
  },
})

export default withMDX({
  reactStrictMode: true,
  basePath: '/open-source/css-gui',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
})
