type Variable = string;

type Term =
  | { kind: 'Var'; variable: Variable }
  | { kind: 'Abs'; variable: Variable; body: Term }
  | { kind: 'App'; func: Term; arg: Term };


  function normalize(term: Term): Term {
    if (term.kind === 'App') {
      const func = normalize(term.func);
      const arg = normalize(term.arg);
      if (func.kind === 'Abs') {
        return substitute(func.body, func.variable, arg);
      }
      return { kind: 'App', func, arg };
    }
    if (term.kind === 'Abs') {
      const body = normalize(term.body);
      return { kind: 'Abs', variable: term.variable, body };
    }
    return term; // se  for uma var nao precisa normalizar
  }
  
  function substitute(term: Term, variable: Variable, replacement: Term): Term {
    if (term.kind === 'Var') {
      return term.variable === variable ? replacement : term;
    }
    if (term.kind === 'App') {
      const func = substitute(term.func, variable, replacement);
      const arg = substitute(term.arg, variable, replacement);
      return { kind: 'App', func, arg };
    }
    if (term.kind === 'Abs') {
      if (term.variable === variable) {
        return term; // nao substitua var conectadoss
      }
      const body = substitute(term.body, variable, replacement);
      return { kind: 'Abs', variable: term.variable, body };
    }
    return term;
  }
  

  // test 
  // const term: Term = {
  //   kind: 'App',
  //   func: {
  //     kind: 'Abs',
  //     variable: 'x',
  //     body: { kind: 'Var', variable: 'x' }
  //   },
  //   arg: { kind: 'Var', variable: 'y' }
  // };

  function mini_parser_legacy(src: string) {
    let i = 0;
    function parseTerm(): Term {
      if (src[i] === '(') {
        i++;
        const func = parseTerm();
        const arg = parseTerm();
        return { kind: 'App', func, arg };
      }
      if (src[i] === 'λ' || src[i] === '\\') {
        i++; // skip lambda or /
        const variable = src[i];
        i++; // skip variable
        if(src[i] === '.'){
          i++; // skip '.'
        }
        const body = parseTerm();
        return { kind: 'Abs', variable, body };
      }
      if(src[i] === ')') {
        i++;
      }
      if(!src[i].trim()) {
        i++;
      }
      const variable = src[i];
      i++; // skip variable
      return { kind: 'Var', variable };
    }
    return parseTerm();
  }
  const _term = mini_parser_legacy('(λx. x) y');
  /*


  y
  
  
  
  
  */
  console.log(_term);
  
  const normalizedTerm = normalize(_term);
  console.log(normalizedTerm); 
  