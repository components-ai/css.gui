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
  if (rest[0] !== ')') {
    return [head, tail]
  }
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
  return /^[-_A-Za-z0-9]+\($/.test(str)
}

const tokenPattern =
  /(?:"(?:\\.|[^"\\])*")|(?:'(?:\\.|[^'\\])*')|(?:[-_A-Za-z0-9]+\()|(?:#[a-fA-F0-9]+)|[-_%A-Za-z0-9.]+|\/|,|\)|\+|\-|\*/y

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
  const tokens = []
  let index = 0

  while (index < str.length) {
    if (/\s/.test(str[index])) {
      index += 1
      continue
    }

    tokenPattern.lastIndex = index
    const match = tokenPattern.exec(str)

    if (match) {
      tokens.push(match[0])
      index = tokenPattern.lastIndex
    } else {
      tokens.push(str[index])
      index += 1
    }
  }

  return tokens
}
