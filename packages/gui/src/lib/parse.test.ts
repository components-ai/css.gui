import { tokenize } from './parse'
describe('tokenize()', () => {
  it('tokenizes dimensions and numbers', () => {
    expect(tokenize('2rem')).toEqual(['2rem'])
    expect(tokenize('2.5')).toEqual(['2.5'])
  })

  describe('strings', () => {
    it('tokenizes double-quoted strings', () => {
      expect(tokenize('"some name"')).toEqual(['"some name"'])
    })
    it('tokenizes single-quoted strings', () => {
      expect(tokenize("'some name'")).toEqual(["'some name'"])
    })
    it.todo('tokenizes escaped strings correctly')
  })

  it('tokenizes lists', () => {
    expect(tokenize('inset 2rem 3rem 1rem 4rem')).toEqual([
      'inset',
      '2rem',
      '3rem',
      '1rem',
      '4rem',
    ])
  })

  describe('functions', () => {
    it('tokenizes functions', () => {
      expect(tokenize('translate(2px,3px)')).toEqual([
        { name: 'translate', arguments: ['2px', ',', '3px'] },
      ])
    })
    it('tokenizes nested functions', () => {
      expect(tokenize('repeat(1, fit-content(3rem))')).toEqual([
        {
          name: 'repeat',
          arguments: [
            '1',
            ',',
            {
              name: 'fit-content',
              arguments: ['3rem'],
            },
          ],
        },
      ])
    })

    it.todo('fails gracefully on mismatched parentheses')
  })
})
