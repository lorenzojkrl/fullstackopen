// We can create a type using the TypeScript native keyword type. 
// Using the OR operator | we can define a variable to accept multiple values by creating a union type. 
// In this case we used exact strings (that in technical terms are called string literal types) 
// but with unions you could also make the compiler to accept for example both string and number: string | number.
// The type keyword defines a new name for a type, a type alias. 
// Since the defined type is a union of three possible values, 
// it is handy to give it an alias that has a representative name.
type Operation = 'multiply' | 'add' | 'divide';
type Result = number
const calculator = (a: number, b: number, op: Operation): Result => {
    switch(op){
      case 'multiply':
        return a*b;
      case 'add':
        return a+b;
      case 'divide':
        if(b===0) throw new Error ('Can\'t divide by 0!');
        return a/b;
      default:
        throw new Error('Operation is not multiply, add or divide!');
    }
  }
  
  try {
    console.log(calculator(1, 5 , 'divide'))
  } catch (e) {
    console.log('Something went wrong, error message: ', e.message);
  }