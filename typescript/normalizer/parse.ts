// import {  Expression,AbstractionExpression, KindEnum ,lexerType, tokensEnum} from "./types";

// export const parse =(lexer:lexerType) => {
//   // return parseModule();
//   function parseModule(){
//     return tokens;
//   }


//   const parseExpression = (): Expression => {
//    if(tryParseToken(tokensEnum.OPEN)){
//      return parseAbstraction();
//    }
//    throw new Error('Unexpected token')
//   }

//   function parseAbstraction(): AbstractionExpression {
//     if(tryParseToken(tokensEnum.LAMBDA)){
//       const variable = lexer.currentToken().value;
//       lexer.nextToken();
//       let typename = null;
//       if(tryParseToken(tokensEnum.COLON)){
//          typename = parseTypeName();
//       }
//       if(tryParseToken(tokensEnum.DOT)){
//         const body = parseExpression();
//         return {kind: KindEnum.Abstraction, variable, typename, body }
//       } else {
//         throw new Error('Expected DOT')
//       }
//     }
//     throw new Error('Unexpected token')
//   }

//   function parseTypeName(): Type {
//     const exp = parseExpression();
//     return {kind: KindEnum.TypeName, expression: exp}
//   }
//   const tryParseToken = (expected: tokensEnum) => {
//     const ok = lexer.currentToken().type === expected
//     if (ok) lexer.nextToken()
//     return ok
//   }
// }