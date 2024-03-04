
type VariableType = string;
type FreeVariableType = VariableType;
type BoundVariableType = `'${string}`;
type ApplicationType = Readonly<{
  kind: "Application";
  func: Lambda;
  argument: Lambda;
  toString: () => string;
}>
type AbstractionType = Readonly<{
  kind: "Abstraction";
  parameter: BoundVariableType;
  body: Lambda;
  toString: () => string;
}>;
type Lambda =  FreeVariableType  | ApplicationType| AbstractionType ;
function isBound(x: any) {
  if(typeof x === 'string') {
    return x.startsWith("'");
  }
  return false;
}

function Variable(name: string, free?: true): FreeVariableType;
function Variable(name: string, free: false): BoundVariableType;
function Variable(name: string, free: undefined): FreeVariableType;
function Variable(name: string, free?: boolean ) {
  free = free ?? true;
  name = name.replace(/'/g, '');
  //  adiciona um underline para variaveis ligadas
  return free ? name : `'${name}`;

}
const x = 'x'
const y = 'y'
const z = 'z'
const w = 'w'
const a = 'a'
const b = 'b'
const c = 'c'
const f = 'f'
const g = 'g'


const xBound = Variable(x, false);



const apply = (...args: Lambda[]): ApplicationType => {
  if(args.length < 2) {
    throw new Error('apply needs at least two arguments');
  }


  const applyOnce = (func: Lambda, argument: Lambda): ApplicationType => {
    return {
      kind: "Application",
      func,
      argument,
      toString
    }
  }

  let current = applyOnce(args[0], args[1]);
  for(let i = 2; i < args.length; i++) {
    current = applyOnce(current, args[i]);
  }
  return current;
}
function toString(this: AbstractionType | ApplicationType): string {
  if (this.kind === "Abstraction") {
      const { parameter, body } = this;
      return `[ λ${parameter} . ${body.toString()} ]`;
  } else if (this.kind === "Application") {
      const { func, argument } = this;
      return `${func.toString()} (${argument.toString()})`;
  }
  const nothing: never = this;
  return nothing;
}

function substitution(expr: Lambda, replace: VariableType, with_: Lambda): Lambda {
 if (typeof expr === 'string') {
  // variavel
  if(expr === replace) {
    if (!isBound(expr) && !isBound(with_)) throw 'You only can replace a free variable with a bound variable'
    return with_;
  }
  return expr;
 }
 if (expr.kind === 'Abstraction') {
  if (expr.parameter === replace) {
    return expr;
  }
  return {
    ...expr,
    body: substitution(expr.body, replace, with_)
  }

 }
 if (expr.kind === 'Application') {
  const { func, argument } = expr;
  return {
    ...expr,
    func: substitution(func, replace, with_),
    argument: substitution(argument, replace, with_),
  }
 }


 // garantia de que verificamos todos os tipos
 const nothing: never = expr; 
  return nothing;
}


const abstract = (variable: FreeVariableType, expr: Lambda): AbstractionType => {
  const parameter = Variable(variable, false);
  const body = substitution(expr, variable, parameter);
  return {
    kind: "Abstraction",
    parameter,
    body,
    toString
  }
}


// console.log(apply(x, y, apply(z, w)).toString());


// console.log(apply(f, x).toString());
console.log(abstract(x, apply(f, x)).toString());
console.log(abstract(f, apply(f, x)).toString());

console.log(
    apply(x, abstract(f, abstract(x, apply(f, x, y))), z, w).toString()
);