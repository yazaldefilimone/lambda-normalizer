-- {-#  BUILTIN  NATPLUS  _+_  ​​#-} 
-- {-#  BUILTIN  NATTIMES  _*_  #-} 
-- {-#  BUILTIN  NATMINUS  _∸_  #-}

-- importar Data.Nat usando (ℕ; zero; suc; _+_; _*_; _^_; _∸_)


data Bin : Set where
  ⟨⟩ : Bin
  _O : Bin → Bin
  _I : Bin → Bin


inc : Bin → Bin

inc ⟨⟩ = _I ⟨⟩