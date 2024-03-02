
data Bool : Set where 
  true false : Bool

not: Bool -> Bool

not true -> false

not false -> true


data Nat : Set where
  zero : Nat
  suc : Nat -> Nat


add : Nat -> Nat -> Nat
add zero n = n
add (suc m) n = suc (add m n)




-- tipo dependentes
data Vect (A : Set) : Nat → Set where
  nil : Vect A zero
  cons : ∀ {n} → A → Vect A n → Vect A (succ n)
