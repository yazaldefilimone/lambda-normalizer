-- Importando o módulo de igualdade de Agda
import Relation.Binary.PropositionalEquality as Eq
open Eq using (_≡_; refl; cong; sym)
open Eq.≡-Reasoning using (begin_; _≡⟨⟩_; _∎)

-- Tipo indutivo para representar termos do cálculo lambda afino
-- Variáveis são representadas por números naturais
data Term : Set where
  var : ℕ → Term
  lambda : Term → Term
  app : Term → Term → Term

-- Função auxiliar para encontrar a próxima variável livre
nextFreeVar : Term → ℕ
nextFreeVar (var x) = suc x
nextFreeVar (lambda t) = nextFreeVar t
nextFreeVar (app t u) = nextFreeVar t ⊔ nextFreeVar u

-- Função para substituir uma variável por um termo
subst : Term → ℕ → Term → Term
subst (var x) y u = if x ≡ y then u else var x
subst (lambda t) y u = lambda (subst t (suc y) (increment u))
  where
    increment : Term → Term
    increment (var x) = var (suc x)
    increment (lambda t) = lambda (increment t)
    increment (app t u) = app (increment t) (increment u)
subst (app t u) y v = app (subst t y v) (subst u y v)

-- Função para normalizar um termo
normalize : Term → Term
normalize (var x) = var x
normalize (lambda t) = lambda (normalize t)
normalize (app t u) with normalize t | normalize u
... | lambda t' | u' = normalize (subst t' 0 u')
... | t' | u' = app t' u'

-- Alguns testes
_ : normalize (app (lambda (app (var 0) (var 1))) (lambda (var 0))) ≡ var 1
_ = refl

_ : normalize (app (lambda (var 0)) (lambda (var 0))) ≡ lambda (var 0)
_ = refl