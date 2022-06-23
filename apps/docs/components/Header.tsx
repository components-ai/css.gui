import { useId } from 'react'
import Link from 'next/link'
import { Logo } from '@compai/logo'
import pkg from '../../../packages/gui/package.json'

export const Header = () => {
  const id = useId()

  return (
    <header
      sx={{
        fontFamily: 'body',
        borderBottom: 'thin solid',
        borderColor: 'border',
        height: '54px',
        px: 3,
        position: 'sticky',
        width: '100%',
        backgroundColor: 'background',
        zIndex: 999,
        top: 0,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <a
        href="https://components.ai"
        title="Components AI - Home"
        sx={{
          color: 'text',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          mr: 3,
        }}
      >
        <span>
          <Logo height={20} width={20} seed={id} />
        </span>
      </a>
      <Link href="/" passHref={true}>
        <a
          sx={{
            fontWeight: 500,
            color: 'text',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span>
            CSS GUI
            <span sx={{ fontSize: 0, color: 'muted', ml: 1 }}>
              v{pkg.version}
            </span>
          </span>
        </a>
      </Link>
      <Link href="/home" passHref={true}>
        <a
          sx={{
            fontWeight: 500,
            color: 'text',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            fontSize: [0, 1, 1],
            px: 3,
            ml: 'auto',
          }}
        >
          Docs
        </a>
      </Link>
      <Link href="/properties" passHref={true}>
        <a
          sx={{
            fontWeight: 500,
            color: 'text',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            fontSize: [0, 1, 1],
            px: 3,
          }}
        >
          Properties
        </a>
      </Link>
      <a
        sx={{
          textDecoration: 'none',
          color: 'currentColor',
          fontWeight: 600,
          transition: 'color .2s ease-in-out',
          px: 3,
          fontSize: [0, 1, 1],
          ':hover': {
            color: 'primary',
          },
        }}
        href="https://github.com/components-ai/css.gui"
      >
        GitHub
      </a>
    </header>
  )
}
