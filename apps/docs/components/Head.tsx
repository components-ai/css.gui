import NextHead from 'next/head'

type HeadProps = {
  title?: string
  description?: string
  imgUrl?: string
  url?: string
}
export const Head = ({
  title = 'CSS GUI — Visual styling controls for the web',
  description = 'A powerful, extensible, and visual CSS editor for creative coding and end-user styling',
  imgUrl = 'https://dc28c2r6oodom.cloudfront.net/og.png',
  url = 'https://components.ai/open-source/css-gui',
}: HeadProps) => (
  <NextHead>
    <title>{title}</title>
    <meta name="title" content={title} key="title" />
    <meta name="description" content={description} key="description" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content={url} key="og-url" />
    <meta property="og:title" content={title} key="og-title" />
    <meta
      property="og:description"
      content={description}
      key="og-description"
    />
    <meta property="og:image" content={imgUrl} key="og-image" />

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={url} key="twitter-url" />
    <meta property="twitter:title" content={title} key="twitter-title" />
    <meta
      property="twitter:description"
      content={description}
      key="twitter-description"
    />
    <meta property="twitter:image" content={imgUrl} key="twitter-image" />

    <link
      rel="shortcut icon"
      type="image/png"
      href="https://dc28c2r6oodom.cloudfront.net/favicon.ico"
    />
  </NextHead>
)
