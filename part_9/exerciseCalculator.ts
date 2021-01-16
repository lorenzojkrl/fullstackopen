interface Metrics {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

let sampleArray = [3, 0, 2, 4.5, 0, 3, 1]
const calculateExercises = (dailyHours: Array<number>, targetHours: number) : Metrics => {
  let trainingDays: number = dailyHours.filter(num => num !== 0).length
  let avg = dailyHours.reduce((a, b) => a + b, 0)/dailyHours.length

  let isSuccessful: boolean = true
  let rating = 3
  let ratingDescription = 'You made it! You achieved your target!'
  if(avg<targetHours) {
    isSuccessful = false
    if(avg > .8*targetHours){
      rating = 2
      ratingDescription = 'You almost made it! Good Effort!'
    }else{
      rating = 1
      ratingDescription = 'It seems you weren\'t to focused this time'
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
  } 

}

console.log(calculateExercises(sampleArray, 2));
