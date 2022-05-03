import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import * as snippet from '@segment/snippet'

const ANALYTICS_WRITE_KEY =
  process.env.NODE_ENV === 'development'
    ? 'l2esDJDa92SQGAtVN9yZY5ByGKYbXhf5'
    : 'RMUHme5teZLiDPnqWE6z27snMAHmpFei'

export default class extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  renderSnippet() {
    const opts = {
      apiKey: ANALYTICS_WRITE_KEY,
      page: true,
    }

    if (process.env.NODE_ENV === 'development') {
      return snippet.max(opts)
    }

    return snippet.min(opts)
  }

  render() {
    return (
      <Html>
        <Head>
          <script dangerouslySetInnerHTML={{ __html: this.renderSnippet() }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
