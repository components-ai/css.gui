import { dimension } from './dimension'

const schema = dimension({
  type: 'mylength',
  units: ['unit'],
  steps: { unit: 1 },
  regenRanges: { unit: [0, 100] },
})

describe('dimension schema', () => {
  describe('parse', () => {
    it('parses correctly', () => {
      const [result, rest] = schema.parse!(['2unit'])
      expect(result).toEqual({ value: 2, unit: 'unit' })
    })
  })
})
