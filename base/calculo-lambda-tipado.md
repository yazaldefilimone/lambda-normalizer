```h
(λx : Int. λy : Int. x + y) 3 5

```


```ts
(λf: (Int -> Int) -> Int. f(λx: Int. x + 1)) (λx: Int. x * x)
(λx:Int. (λx: Int.x+1) * (λx: Int.x+1)) 2
((λx: Int.x+1) 2 * (λx: Int.x+1) 2)
((2+1) * (2+1))
(3 * 3)
9
``