import { HTMLAttributes, useId } from 'react'
import Link from 'next/link'
import { Logo } from '@compai/logo'

interface Props extends HTMLAttributes<HTMLDivElement> {}
export const Layout = (props: Props) => {
  const id = useId()
  return (
    <>
      <header
        sx={{
          fontFamily: 'body',
          borderBottom: 'thin solid',
          borderColor: 'border',
          px: [2, 3, 3],
          py: 3,
          position: 'sticky',
          width: '100%',
          backgroundColor: 'background',
          zIndex: 999,
          top: 0,
        }}
      >
        <Link href="/home" passHref={true}>
          <a
            sx={{
              fontWeight: 500,
              color: 'text',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span sx={{ mr: 4 }}>
              <Logo height={20} width={20} seed={id} />
            </span>
            <span>CSS GUI</span>
          </a>
        </Link>
      </header>
      <div
        sx={{
          fontFamily: 'body',
          display: 'flex',
          flexDirection: ['column', 'row'],
        }}
        {...props}
      />
    </>
  )
}
