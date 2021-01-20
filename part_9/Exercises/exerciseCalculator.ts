interface InputValues {
  targetHours: number;
  dailyHoursArray: Array<number>
}

interface Metrics {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

// let sampleArray = [3, 0, 2, 4.5, 0, 3, 1]
const calculateExercises = (dailyHours: Array<number>, targetHours: number) : Metrics => {
  const trainingDays: number = dailyHours.filter(num => num !== 0).length;
  const avg = dailyHours.reduce((a, b) => a + b, 0)/dailyHours.length;

  let isSuccessful = true;
  let rating = 3;
  let ratingDescription = 'You made it! You achieved your target!';
  if(avg<targetHours) {
    isSuccessful = false;
    if(avg > .8*targetHours){
      rating = 2;
      ratingDescription = 'You almost made it! Good Effort!';
    }else{
      rating = 1;
      ratingDescription = 'It seems you weren\'t to focused this time';
    }
  }

  return {
    periodLength : dailyHours.length,
    trainingDays: trainingDays,
    success: isSuccessful,
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetHours,
    average: avg
  }; 

};

const parseArguments = (args: Array<string>) : InputValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const dailyHoursArray = args.slice(3).map(time => {
    if(time !== ' '){
      return +time;
    }
  });
  
  if (!isNaN(Number(args[2])) && !dailyHoursArray.includes(NaN)) {
    return {
      dailyHoursArray: dailyHoursArray,
      targetHours: Number(args[2])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try{
  const {targetHours, dailyHoursArray} = parseArguments(process.argv);
  // console.log('targetH', targetHours);
  // console.log('daily', dailyHoursArray);
  
  console.log(calculateExercises(dailyHoursArray, targetHours));

}catch(e){
  if(e instanceof Error){
    console.log('Error, something bad happened, message: ', e.message);
  }
}