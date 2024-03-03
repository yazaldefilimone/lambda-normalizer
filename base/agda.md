


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



```agda
-- t
data Bool : Set where
  true false : Bool
--- fn
not : Bool → Bool
not true = false
not false = true


```



<!--  -->






1. prova Associatividade
Uma propriedade da adição é que ela é associativa , ou seja, a localização dos parênteses não importa:

```
(m + n) + p ≡ m + (n + p)
```
Aqui m, n, e psão variáveis ​​que abrangem todos os números naturais.

Podemos testar a proposição escolhendo números específicos para as três variáveis:

```agda
_ : (3 + 4) + 5 ≡ 3 + (4 + 5)
_ =
  begin
    (3 + 4) + 5
  ≡⟨⟩
    7 + 5
  ≡⟨⟩
    12
  ≡⟨⟩
    3 + 9
  ≡⟨⟩
    3 + (4 + 5)
  ∎
```


```agda

-- -------------------------------
-- (zero + n) + p ≡ zero + (n + p)

-- (m + n) + p ≡ m + (n + p)
-- ---------------------------------
-- (suc m + n) + p ≡ suc m + (n + p)

+-assoc : ∀ (m n p : ℕ) → (m + n) + p ≡ m + (n + p)
+-assoc zero n p =
  begin
    (zero + n) + p
  ≡⟨⟩
    n + p
  ≡⟨⟩
    zero + (n + p)
  ∎
+-assoc (suc m) n p =
  begin
    (suc m + n) + p
  ≡⟨⟩
    suc (m + n) + p
  ≡⟨⟩
    suc ((m + n) + p)
  ≡⟨ cong suc (+-assoc m n p) ⟩
    suc (m + (n + p))
  ≡⟨⟩
    suc m + (n + p)
  ∎

```
<!-- ∀ (m n p : ℕ) → (m + n) + p ≡ m + (n + p) -->
O A invertido é pronunciado “para todos”, e a proposição afirma que para todos os números naturais m,, ne pa equação (m + n) + p ≡ m + (n + p)é válida. A evidência para a proposição é uma função que aceita três números naturais, vincula-os a m,, ne p, e retorna evidência para a instância correspondente da equação.



- Indução como recursão
Como exemplo concreto de como a indução corresponde à recursão, aqui está o cálculo que ocorre ao instanciar mna 2prova de associatividade.

```agda
+-assoc-0 : ∀ (n p : ℕ) → (0 + n) + p ≡ 0 + (n + p)
+-assoc-0 n p =
  begin
    (0 + n) + p
  ≡⟨⟩
    n + p
  ≡⟨⟩
    0 + (n + p)
  ∎

+-assoc-1 : ∀ (n p : ℕ) → (1 + n) + p ≡ 1 + (n + p)
+-assoc-1 n p =
  begin
    (1 + n) + p
  ≡⟨⟩
    suc (0 + n) + p
  ≡⟨⟩
    suc ((0 + n) + p)
  ≡⟨ cong suc (+-assoc-0 n p) ⟩
    suc (0 + (n + p))
  ≡⟨⟩
    1 + (n + p)
  ∎

+-assoc-2 : ∀ (n p : ℕ) → (2 + n) + p ≡ 2 + (n + p)
+-assoc-2 n p =
  begin
    (2 + n) + p
  ≡⟨⟩
    suc (1 + n) + p
  ≡⟨⟩
    suc ((1 + n) + p)
  ≡⟨ cong suc (+-assoc-1 n p) ⟩
    suc (1 + (n + p))
  ≡⟨⟩
    2 + (n + p)
  ∎

  ```


  2. prova: comutatividade
