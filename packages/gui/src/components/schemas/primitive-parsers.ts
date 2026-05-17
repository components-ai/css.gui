export function parseNumberToken(token: unknown) {
  if (typeof token !== 'string') return undefined

  const asNumber = Number(token)
  if (Number.isNaN(asNumber)) return undefined

  return asNumber
}

export function parseIntegerToken(token: unknown) {
  const asNumber = parseNumberToken(token)
  if (asNumber === undefined) return undefined
  if (!Number.isInteger(asNumber)) return undefined

  return asNumber
}

export function parseQuotedStringToken(token: unknown) {
  if (typeof token !== 'string') return undefined
  if (token.length < 2) return undefined

  const quote = token[0]
  if ((quote !== '"' && quote !== "'") || token[token.length - 1] !== quote) {
    return undefined
  }

  return token.substring(1, token.length - 1)
}

export function parseIdentToken(token: unknown) {
  if (typeof token !== 'string') return undefined
  if (!/^[-_0-9A-Za-z]+$/.test(token)) return undefined

  return token
}
