interface BodyParams {
    height: number;
    weight: number;
  }

//   parseArguments receives an array of strings from the command line
  const parseArguments = (args: Array<string>): BodyParams => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

const calculateBmi = (height: number, weight: number) : string => {
    let bmi = weight/(height/100)**2;
    if(bmi < 25){
        return 'Normal (Healthy Weight)';
    }else if (bmi >= 30){
        return 'Obese (Fancy a diet?)';
    }else{
        return 'Overweight (Unhealthy Weight)';
    }
}

try{
    const {height, weight} = parseArguments(process.argv);
    // console.log(typeof(process.argv[2]), process.argv[3]);
    console.log(calculateBmi(height, weight)) 
}catch(e){
  console.log('Error, something bad happened, message: ', e.message);
}
