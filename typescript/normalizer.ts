type Term = Var | Lambda | App;

interface Var {
  kind: 'var';
  index: number;
}

interface Lambda {
  kind: 'lambda';
  body: Term;
}

interface App {
  kind: 'app';
  left: Term;
  right: Term;
}

function nextFreeVar(term: Term): number {
  switch (term.kind) {
    case 'var':
      return term.index + 1;
    case 'lambda':
      return nextFreeVar(term.body);
    case 'app':
      return Math.max(nextFreeVar(term.left), nextFreeVar(term.right));
  }
}

function subst(term: Term, index: number, replacement: Term): Term {
  switch (term.kind) {
    case 'var':
      return term.index === index ? replacement : term;
    case 'lambda': {
      const newBody = subst(term.body, index + 1, shift(replacement, 1));
      return { kind: 'lambda', body: newBody };
    }
    case 'app':
      return {
        kind: 'app',
        left: subst(term.left, index, replacement),
        right: subst(term.right, index, replacement),
      };
  }
}

function shift(term: Term, offset: number): Term {
  switch (term.kind) {
    case 'var':
      return { kind: 'var', index: term.index + offset };
    case 'lambda':
      return { kind: 'lambda', body: shift(term.body, offset) };
    case 'app':
      return {
        kind: 'app',
        left: shift(term.left, offset),
        right: shift(term.right, offset),
      };
  }
}

function normalize(term: Term): Term {
  switch (term.kind) {
    case 'var':
      return term;
    case 'lambda':
      return { kind: 'lambda', body: normalize(term.body) };
    case 'app': {
      const left = normalize(term.left);
      const right = normalize(term.right);
      if (left.kind === 'lambda') {
        return normalize(subst(left.body, 0, right));
      } else {
        return { kind: 'app', left, right };
      }
    }
  }
}

const term1: Term = {
  kind: 'app',
  left: { kind: 'lambda', body: { kind: 'app', left: { kind: 'var', index: 0 }, right: { kind: 'var', index: 1 } } },
  right: { kind: 'lambda', body: { kind: 'var', index: 0 } },
};
console.log(normalize(term1)); // { kind: 'var', index: 1 }

const term2: Term = {
  kind: 'app',
  left: { kind: 'lambda', body: { kind: 'var', index: 0 } },
  right: { kind: 'lambda', body: { kind: 'var', index: 0 } },
};
console.log(normalize(term2)); // { kind: 'lambda', body: { kind: 'var', index: 0 } }