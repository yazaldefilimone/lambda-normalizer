import { SpecType, TokenType, lexerType, tokensEnum } from "./types";

const specs:SpecType[] = [
  [/^\s+/, null],
  [/^\\/, tokensEnum.LAMBDA],
  [/^λ/, tokensEnum.LAMBDA],
  [/^\./, tokensEnum.DOT],
  [/^\(/, tokensEnum.OPEN],
  [/^\)/, tokensEnum.CLOSE],
  [/^\->/, tokensEnum.ARROW],
  [/^\:/, tokensEnum.COLON],
  [/^[a-zA-Z]+/, tokensEnum.VAR],
]

export function tokenizer(code:string): lexerType {
  let cursor = 0;
  const tokens: TokenType[] = [];
  const _string = code;
  return {
    getTokens,
    getNextToken,
    currentToken: () => tokens[cursor],
    nextToken: () => tokens[cursor + 1]
  }

  function getTokens() {
    while (!isEOF()) {
      tokens.push(getNextToken());
    }
    tokens.push(getNextToken())
    return tokens;
  }

  function isEOF(){
    return cursor === code.length;
  }
  function _match(regex: RegExp, value: string) {
    const matched = regex.exec(value);
    if (matched === null) {
      return null;
    }
    cursor += matched[0].length;
    return matched[0];
  }

  function getNextToken() {
    if (!_isHasTokens()) {
      return { type: tokensEnum.EOF, value: '' };
    }
    for (const [regex, type] of specs) {
      const match = _match(regex, code.slice(cursor));
      if (!match) {
        continue;
      }
      if (!type) {
        return getNextToken();
      }
      return { type, value: match };
    }
    throw new Error(`Unexpected character: ${code[cursor]}`);
  }
  function _isHasTokens() {
    return cursor < _string.length;
  }
}