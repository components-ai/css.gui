import { useRouter } from 'next/router'

const Page = () => {
  const router = useRouter()

  if (router.asPath === '/') {
    router.push('/html-editor')
  }

  return <h1>404: We couldn&apos;t find that page</h1>
}

export default Page
