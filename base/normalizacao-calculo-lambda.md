Normalizacao, e uma forma usada para reduzir expressoes lambdas ate que nao possamos mais faze-lo.
Para isso tem duas formais conhecidas:

1. Reducao β
  > substituir todas as ocorrencias de uma variável em uma abstracao pelo argumento da aplicacao.
2. Reducao η
 > remover abstracoes repetidas.





#### Exemplos

1. Reducao β

```h
(λx.x + 1) 3
//-- 1. Redução-β 
x  = 3
(λx.x + 1)
3 + 1
4 


// --
(λx. (λy. x + y) 3) 5
x = 3
y = 5
(λy. 3 + y)
3 + 5
8
```

1. Reducao η


```h
λx.(λy.x+y)
λy.x+y ->  y + x
λz.x+z ->  z + x
λy.x+y

// --

λx.(λy.x+y) 
x = y
y = w
λw.x+w

```



```h
1.
λx.x

2.
λx.λy.x+y
3.
(λx.(λy.x+y) 3)
λy.3+y

4.
(λx.x/2 = 1)
5.
x x

7.
((λx.x 2) (λy.y+1))
(λy.y + 1) 2
1 + 2
3
```



```h
zero

type N {
  value: zero
  succ: N -> N
}

N.succ(zero) +  N.succ(zero)

suc((suc(zero))) = 2

f(x) = f(y) = y(x)

```