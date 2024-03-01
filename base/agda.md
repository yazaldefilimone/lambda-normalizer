


Compute 3 + 4, writing out your reasoning as a chain of equations, using the equations for +.
<!-- 3 + 4 = 7 -->
```agda
3 + 4 
=  suc (2 + 4)
= suc (suc (1 + 4))
= suc (suc (suc (0 + 4)))
= suc (suc (suc 4))
```



```agda

_  = 
  início 
    2  *  3 
  ≡⟨⟩     -- caso indutivo 
    3  +  ( 1  *  3 ) 
  ≡⟨⟩     -- caso indutivo 
    3  +  ( 3  +  ( 0  *  3 )) 
  ≡⟨⟩     -- caso base 
    3  +  ( 3  +  0 ) 
  ≡⟨⟩     - simplificar 
    6 
  ∎

```