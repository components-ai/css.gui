import { webcrypto } from 'crypto'

export const randomElementID = () => {
  const crypto =
    typeof window === 'undefined'
      ? (webcrypto as unknown as Crypto)
      : window.crypto

  return `cssgui-zzzzz`
}
