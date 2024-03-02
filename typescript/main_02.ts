type VariableType = string;

type VarExprType = {
  kind: 'Var';
  variable: VariableType;
}
type AbsExprType = {
  kind: 'Abs';
  variable: VariableType;
  body: TermType;
}
type AppExprType = {
  kind: 'App';
  func: TermType;
  arg: TermType;
}

type TermType = VarExprType | AbsExprType | AppExprType;


function mini_parser(code: string){}

x:Int