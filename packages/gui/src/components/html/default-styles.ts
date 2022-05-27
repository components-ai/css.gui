import { HTMLTag } from './types'

export const DEFAULT_STYLES: Record<string, any> = {
  [HTMLTag.Button]: {
    padding: { value: 16, unit: 'px' },
    borderRadius: { value: 5, unit: 'px' },
    display: 'block',
    borderStyle: 'none',
  },
  [HTMLTag.A]: {},
  [HTMLTag.Input]: {},
  [HTMLTag.H1]: { textAlign: 'left' },
  [HTMLTag.H2]: { textAlign: 'left' },
  [HTMLTag.H3]: { textAlign: 'left' },
  [HTMLTag.H4]: { textAlign: 'left' },
  [HTMLTag.H5]: { textAlign: 'left' },
  [HTMLTag.H6]: { textAlign: 'left' },
}
