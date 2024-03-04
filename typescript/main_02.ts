// type VariableType = string;

// type TypeNameORExprType = VariableType | {
//   kind: "Type";
//   type: VariableType;
//   body: TypeNameORExprType;
// }
// type VarExprType = {
//   kind: "Var";
//   variable: VariableType;
//   typename: TypeNameORExprType | null;
// };
// type AbsExprType = {
//   kind: "Abs";
//   variable: VarExprType;
//   body: TermType[];
// };
// type AppExprType = {
//   kind: "App";
//   func: TermType;
//   arg: TermType;
// };

// type TermType = VarExprType | AbsExprType | AppExprType;
// type ProgramType = {
//   kind: "Program";
//   body: TermType;
// }

// enum tokensEnum {
//   LAMBDA = "LAMBDA",
//   DOT = "DOT",
//   VAR = "VAR",
//   OPEN = "OPEN",
//   CLOSE = "CLOSE",
//   ARROW = "ARROW",
//   COLON = "COLON",
// }
// const spec: [RegExp, tokensEnum | null][] = [
//   [/^\(/, tokensEnum.OPEN],
//   [/^\)/, tokensEnum.CLOSE],
//   [/^\./, tokensEnum.DOT],
//   [/^\\/, tokensEnum.LAMBDA],
//   [/^λ/, tokensEnum.LAMBDA],
//   [/^\:/, tokensEnum.COLON],
//   [/^->/, tokensEnum.ARROW],
//   [/^[a-zA-Z]+/, tokensEnum.VAR],
//   [/^\s+/, null],
// ];

// type TokenType = {
//   type: tokensEnum;
//   value: string;
// }

// function lexer(code: string): TokenType[] {
//   let _cursor = 0;
//   const tokens: TokenType[] = [];
//   return getTokens();
//   function getTokens() {
//     while (!_isEOF()) {
//       const token = _getNextToken();
//       tokens.push(token);
//     }
//     return tokens;
//   }

//   function _getNextToken() {
//     for (const [regex, type] of spec) {
//       const match = _match(regex, code.slice(_cursor));
//       if (!match) {
//         continue;
//       }
//       // should skip token... e.g. whitespace
//       if (!type) {
//         return _getNextToken();
//       }
//       return { type, value: match };
//     }
//     throw new Error(`Unexpected character: ${code[_cursor]}`);
//   }
//   function _isEOF() {
//     return _cursor === code.length;
//   }
//   function _match(regex: RegExp, value: string) {
//     const matched = regex.exec(value);
//     if (matched === null) {
//       return null;
//     }
//     _cursor += matched[0].length;
//     return matched[0];
//   }

// }



// function parser(tokens:TokenType[]) {
//   let pointer = 0;
//   let currentToken = tokens[pointer];

//   function isCurrentToken(type:tokensEnum) {
//     return currentToken.type === type;
//   }

//   function eat(type:tokensEnum) {
//     if(isCurrentToken(type)){
//       let store = currentToken;
//       pointer++;
//       currentToken = tokens[pointer];
//       return store;
//     }
//     throw new Error(`Unexpected token: ${currentToken.type}, expected: ${type}`);
//   }
//   return Program();

//   function parseApp(): AppExprType {
//     eat(tokensEnum.OPEN);
//     const func = parseExpression();
//     eat(tokensEnum.CLOSE)
//     const arg = parseExpression();
//     const app:AppExprType = {
//       kind: "App",
//       func,
//       arg,
//     }
//     return app;

//   }

//   function isExpression() {
//     if(_isEOF()){
//       return false;
//     }
//     return isCurrentToken(tokensEnum.OPEN) || isCurrentToken(tokensEnum.LAMBDA) || isCurrentToken(tokensEnum.VAR);
//   }

//   function parseAbs(): AbsExprType {
//     eat(tokensEnum.LAMBDA);
//     const variable = parseVar();
//     eat(tokensEnum.DOT);
//     const body = [parseExpression()];
//     while (isExpression()){
//       body.push(parseExpression());
//     }
//     return {
//       kind: "Abs",
//       variable,
//       body,
//     };
//   }

//   function parseVar(): VarExprType {
//     const var_ = eat(tokensEnum.VAR);
//     let typename = null;
//     if(isCurrentToken(tokensEnum.COLON)){
//       eat(tokensEnum.COLON);
//       typename = eat(tokensEnum.VAR);
//     }
//     return  {
//       kind: "Var",
//       variable: var_.value,
//       typename: typename?.value || null,
//     };
//   }
//   function _isEOF() {
//     return pointer === tokens.length;
//   }

//   function parseExpression(): TermType {
//     switch (currentToken.type) {
//       case tokensEnum.OPEN:
//         return parseApp();
//       case tokensEnum.LAMBDA:
//         return parseAbs();
//       case tokensEnum.VAR:
//         return parseVar();
//       default:
//         throw new Error(`Unexpected token: ${currentToken.type}`);
//     }
//   }

//   function Program() {
//     const body = parseExpression()
//     return {
//       kind: "Program",
//       body
//     }
//   }
// }

// const code = `(λx:Bool -> Bool. (λy:Bool. x (x y))) (λz:Bool. z)`
// const tokens = lexer(code);
// // const ast = parser(tokens);
// console.log(tokens);