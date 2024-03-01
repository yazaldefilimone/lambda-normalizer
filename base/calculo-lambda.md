


```ts
type p = any;

type uf = (a: p) => p; // unary func

// Numbers
type N = (f: uf) => (x: p) => p; // Numbers

const succ = (n: N) => (f: uf) => (x: p) => f(n(f)(x));

const to:N = f => x => f(f(x));
const te:N = f => x => f(f(f(x)))
const fr:N = f => x => f(f(f(f(x))))
const f = (x:p) => x + 1;
const x = 0;
const to_v = to(f)(x); // 2 two value
const te_v = te(f)(x); // 3 three value
const fr_v = fr(f)(x) // 4 four value
//  ----

const t_s = succ(to)
const three_ = t_s(f)(x)
const three_s = succ(t_s);
const four_ = three_s(f)(x)
console.log({
  to_v,
  te_v,
  fr_v,
  three_,
  four_
})
// Booleans


const True = (x:p) => (y:p) => x;
const False = (x:p) => (y:p)=>  y;  

```
<!-- λ -->

```hs
λx.(λy.y+x)
```

```js
(((x) => (y) => y + x, 10), 20)
```


```
// (λx.x) (λy.y)
(x) => x; (y) => y;
```



```js

const log = (an) => console.log(an);

// console.log(((x) => (y) => y + x)(10)(20));

// console.log(((x) => x + 2)(10));

/// -----------
// (λx.x) (λy.y)
// (x) => x; (y) => y;

// assume that y is 10;
// 1. (λx.(λy.xy)) 10
// x[x:= 10]
// 2. (λx(λy.10y)) 20
// y[y:=20]
// 3. (λx(λy.1020))

// let y = 10;
// ((x) => (y) => x+y)(10);
// ((y) => 10 + y)(20)
// (10 + 20)

// const True = (a) => (b) => a;
// console.log(True(false)(true));
// const If = Condition => Then => Else => Condition(Then)(Else)

const True = (a) => (b) => a;
const False = (a) => (b) => b;
const isTrue = () => "it's true!";
const isFalse = () => "it's false!";

const IF = (c) => (t) => (e) => c(t)(e);
const First = IF(True)(isTrue)(isFalse);
const Second = IF(False)(isTrue)(isFalse);
/*
True = (λt.(λf.t))
False = (λt.(λf.f))

if = λ.c(λx.(λ.e c x e))



if true = λp.(λa.(λb. p a b)) 
true = p[p := true] 
= true a b 
= λa.(λb.a) 
a b = a


*/

// console.log(First());
// console.log(Second());

/*
0 = λyz.y(z)
 */

// let zero = (y, z) => y(z);
// let zero = (((x) => (y) => y)(0)(0))
// log(zero(0)(0));

// numbers
/*

1 = λxy.x(y)
2 = λxy.x(x(y))
3 = λxy.x(x(x(y)))
...
 */

const one = (x, y) => x(y);

const two = (x, y) => x(x(y));
const three = (x, y) => x(x(x(y)));

//  if cond...,  then..., else...;
/*


(λi.(λc.(λt.(λ.e c t e))))


*/
```