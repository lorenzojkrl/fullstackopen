interface Metrics {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
  }

const exerciseCalc = (dailyHours: Array<number>, targetHours: number) : Metrics => {
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

export {exerciseCalc};