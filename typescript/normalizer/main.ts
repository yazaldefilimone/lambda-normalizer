import { tokenizer } from "./tokenizer"

const lambdaCalculusLarge = `(λx:Int.λy:Float.x) (λz:Int -> Int -> Nat.z) (λw:Nil.w)`
function main(){
  const lex = tokenizer(lambdaCalculusLarge);
  console.log(lex.getTokens());
  
}
main();