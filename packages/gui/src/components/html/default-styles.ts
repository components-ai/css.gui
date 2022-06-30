import { HTMLTag } from './types'

export const DEFAULT_STYLES: Record<string, any> = {
  [HTMLTag.Button]: {},
  [HTMLTag.A]: {},
  [HTMLTag.Input]: {},
  [HTMLTag.H1]: { textAlign: 'left' },
  [HTMLTag.H2]: { textAlign: 'left' },
  [HTMLTag.H3]: { textAlign: 'left' },
  [HTMLTag.H4]: { textAlign: 'left' },
  [HTMLTag.H5]: { textAlign: 'left' },
  [HTMLTag.H6]: { textAlign: 'left' },
}

export const DEFAULT_ATTRIBUTES: Record<string, any> = {
  [HTMLTag.Svg]: {
    version: '1.1',
    xmlns: 'http://www.w3.org/2000/svg',
  },
}
