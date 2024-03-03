export enum KindEnum {
  Application = 'Application',
  Abstraction = 'Abstraction',
  Variable = 'Variable',
  TypeName = 'TypeName',
}

type AbstractionTypeExpression = {
  kind: KindEnum.Abstraction;
  variable: string;
  body: Expression;
}

export type  ApplicationExpression = {
  kind: KindEnum.Application;
  left: Expression;
  right: Expression;
}

export type AbstractionExpression = {
  kind: KindEnum.Abstraction;
  variable: string;
  body: Expression;
}

export type VariableExpression = {
  kind: KindEnum.Variable;
  variable: string;
}

export type Expression = ApplicationExpression | AbstractionExpression | VariableExpression

export enum tokensEnum {
  LAMBDA = "LAMBDA",
  DOT = "DOT",
  VAR = "VAR",
  OPEN = "OPEN",
  CLOSE = "CLOSE",
  ARROW = "ARROW",
  COLON = "COLON",
  EOF = "EOF",
}
export type SpecType = [RegExp, tokensEnum | null];

export type TokenType = {
  type: tokensEnum;
  value: string;
}

export type lexerType = {
  getTokens: () => TokenType[];
  getNextToken: () => TokenType;
  currentToken: () => TokenType;
  nextToken: () => TokenType;
}