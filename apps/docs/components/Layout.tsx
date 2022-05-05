import { HTMLAttributes, useId } from 'react'
import Link from 'next/link'
import { Logo } from '@compai/logo'
import pkg from '../../../packages/gui/package.json'

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
          display: 'flex',
          alignItems: 'center',
        }}
      >
          <a
            href='https://components.ai'
            title='Components AI - Home'
            sx={{
              color: 'text',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span sx={{ mr: 4 }}>
              <Logo height={20} width={20} seed={id} />
            </span>
        </a>
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
            <span>
              CSS GUI
              <span sx={{ fontSize: 0, color: 'muted', ml: 1 }}>
                v{pkg.version}
              </span>
            </span>
          </a>
        </Link>
        <a sx={{
          ml: 'auto',
          textDecoration: 'none',
          color: 'currentColor',
          fontWeight: 600,
          transition: 'color .2s ease-in-out',
          px: 3,
          ':hover': {
            color: 'primary'
          }
          }}href='https://github.com/components-ai/css.gui'>
          GitHub 
        </a>
        <a sx={{
          textDecoration: 'none',
          color: 'currentColor',
          fontWeight: 600,
          transition: 'color .2s ease-in-out',
          pl: 3,
          ':hover': {
            color: 'primary'
          }
          }}href='https://www.npmjs.com/package/@compai/css-gui'>
          NPM
        </a>
      </header>
      <div
        sx={{
          fontFamily: 'body',
          display: 'flex',
          flexDirection: ['column-reverse', 'initial'],
        }}
        {...props}
      />
    </>
  )
}
