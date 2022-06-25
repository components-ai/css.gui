import { dimension } from './dimension'

const schema = dimension({
  type: 'my-unit',
  units: ['unit'],
  steps: { unit: 1 },
  regenRanges: { unit: [0, 100] },
})
describe('dimension() schema', () => {
  describe('parse()', () => {
    it('succeeds on valid dimension', () => {
      const [result] = schema.parse(['1unit'])
      expect(result).toEqual({ value: 1, unit: 'unit' })
    })
  })
})
