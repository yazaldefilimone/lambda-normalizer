// // Tipos
// type Type = BaseType | FunctionType;
// type BaseType = "base";
// interface FunctionType {
//   type: "function";
//   paramType: Type;
//   returnType: Type;
// }

// // contexto
// type Context = { [type: string]: string[] }; // mapeia tipos para arrays de variaveis

// // termos
// type Term = Variable | Abstraction | Application;
// type Variable = { kind: "variable"; type: Type; name: string };
// interface Abstraction {
//   kind: "abstraction";
//   paramType: Type;
//   paramName: string;
//   body: Term;
// }
// interface Application {
//   kind: "application";
//   func: Term;
//   arg: Term;
// }

// // Avaliacao
// function evaluate(term: Term, context: Context): Term {
//   switch (term.kind) {
//     case "variable":
//       return term;
//     case "abstraction":
//       return term; // Avaliacao de abstracao e trivial
//     case "application":
//       const func = evaluate(term.func, context);
//       const arg = evaluate(term.arg, context);
//       if (func.kind === "abstraction") {
//         // Substituicao: substitui o parametro pela argumento no corpo da abstracao
//         return substitute(func.body, func.paramName, arg);
//       } else {
//         throw new Error("Application of non-abstraction");
//       }
//   }
// }

// // Substituicao
// function substitute(term: Term, paramName: string, arg: Term): Term {
//   switch (term.kind) {
//     case "variable":
//       return term.name === paramName ? arg : term;
//     case "abstraction":
//       if (term.paramName === paramName) {
//         return term; // Evita captura de variável livre
//       } else {
//         return {
//           kind: "abstraction",
//           paramType: term.paramType,
//           paramName: term.paramName,
//           body: substitute(term.body, paramName, arg),
//         };
//       }
//     case "application":
//       return {
//         kind: "application",
//         func: substitute(term.func, paramName, arg),
//         arg: substitute(term.arg, paramName, arg),
//       };
//   }
// }

// // Normalizacao
// function normalize(term: Term, context: Context): Term {
//   const evaluated = evaluate(term, context);
//   return isNormal(evaluated) ? evaluated : normalize(evaluated, context);
// }

// // Verifica se um termo e normal (abstracao lambda ou variável)
// function isNormal(term: Term): boolean {
//   return term.kind === "abstraction" || term.kind === "variable";
// }

// // in lambda calculus:
// const exampleTerm: Term = {
//   kind: "application",
//   func: {
//     kind: "abstraction",
//     paramType: { type: "function", paramType: "base", returnType: "base" },
//     paramName: "f",
//     body: {
//       kind: "application",
//       func: {
//         kind: "variable",
//         type: { type: "function", paramType: "base", returnType: "base" },
//         name: "f",
//       },
//       arg: { kind: "variable", type: "base", name: "x" },
//     },
//   },
//   arg: { kind: "variable", type: "base", name: "x" },
// };



// const result = normalize(exampleTerm, {});
// console.log(result);
