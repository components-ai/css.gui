export type Token = string | CssFunction

interface CssFunction {
  name: string
  arguments: Token[]
}

export function tokenize(text: string) {
  return processTokens(tokenizeRaw(text))
}

export function processTokens(tokens: string[]) {
  const result = []
  while (tokens.length > 0) {
    const [next, rest] = processToken(tokens)
    result.push(next)
    tokens = rest
  }
  return result
}

function processToken(tokens: string[]): [Token, string[]] {
  const [head, ...tail] = tokens
  if (!isFunctionIdent(head)) {
    return [head, tail]
  }
  const [args, rest] = processArguments(tail)
  return [{ name: head.slice(0, -1), arguments: args }, rest.slice(1)]
}

// Process arguments of CSS functions
function processArguments(tokens: string[]): [Token[], string[]] {
  const result = []
  // TODO error handling when tokens are invalid
  while (tokens.length && tokens[0] !== ')') {
    const [nextToken, tail] = processToken(tokens)
    result.push(nextToken)
    tokens = tail
  }
  return [result, tokens]
}

function isFunctionIdent(str: string) {
  return /[-A-Za-z0-9]+\(/.test(str)
}

/**
 * Tokenize the value into css value tokens (not counting functions)
 */
export function tokenizeRaw(str: string) {
  // A CSS token is defined to be one of the following:
  //  - an alphanumeric, dashed character
  //  - a hex color
  //  - a string, either with double quotes (") or single quotes (')
  //  - a function, which has a string and items wrapped in parentheses
  //  - a literal used in css ( , / + - * )
  // TODO fail if there are any extraneous non-space characters
  return [
    ...str.matchAll(
      /(?:"[^"]*")|(?:'[^']*')|(?:[-_A-Za-z0-9]+\()|[-_%A-Za-z0-9.]+|(?:#[a-f0-9]+)|\/|,|\)|\+|\-|\*/g
    ),
  ].map((match) => match[0])
}
