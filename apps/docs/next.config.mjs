import nextMDX from '@next/mdx'
import remarkGFM from 'remark-gfm'
import remarkPrism from 'remark-prism'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: '@mdx-js/react',
    remarkPlugins: [remarkGFM, remarkPrism],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
  },
})

export default withMDX({
  reactStrictMode: true,
  basePath: '/open-source/css-gui',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
})
