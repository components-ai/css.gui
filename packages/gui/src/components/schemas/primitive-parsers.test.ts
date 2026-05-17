import {
  parseIdentToken,
  parseIntegerToken,
  parseNumberToken,
  parseQuotedStringToken,
} from './primitive-parsers'

describe('primitive parsers', () => {
  describe('parseNumberToken()', () => {
    it('parses number values', () => {
      expect(parseNumberToken('2.5')).toBe(2.5)
      expect(parseNumberToken('-2')).toBe(-2)
    })

    it('rejects non-numeric values', () => {
      expect(parseNumberToken('abc')).toBeUndefined()
      expect(parseNumberToken({ name: 'calc', arguments: [] })).toBeUndefined()
    })
  })

  describe('parseIntegerToken()', () => {
    it('parses integer values', () => {
      expect(parseIntegerToken('3')).toBe(3)
      expect(parseIntegerToken('-2')).toBe(-2)
    })

    it('rejects fractional values', () => {
      expect(parseIntegerToken('1.5')).toBeUndefined()
    })
  })

  describe('parseQuotedStringToken()', () => {
    it('requires matching quotes', () => {
      expect(parseQuotedStringToken('"hello"')).toBe('hello')
      expect(parseQuotedStringToken("'hello'")).toBe('hello')
      expect(parseQuotedStringToken('"hello\'')).toBeUndefined()
      expect(parseQuotedStringToken("'")).toBeUndefined()
    })
  })

  describe('parseIdentToken()', () => {
    it('requires the whole token to be a custom identifier', () => {
      expect(parseIdentToken('custom-name')).toBe('custom-name')
      expect(parseIdentToken('custom-name!')).toBeUndefined()
    })
  })
})
