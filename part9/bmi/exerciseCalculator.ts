export interface WeeklyExerciseHours {
  hours : number[];
}

export interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const parseArgumentExercise = (args : Array<string>): { weeklyExerciseHours: WeeklyExerciseHours, target: number} => {
  // try {
    const target = Number(args[2]);
    const hours : number[] = args.slice(3).map(item=>Number(item));
    const weeklyExerciseHours : WeeklyExerciseHours = {hours: hours};
    return {weeklyExerciseHours, target};
  // } catch (e) {
  //   console.log('Error, something bad happened, message: ', e.message);
  // }
};

export const calculateExercises = (weeklyExerciseHours: WeeklyExerciseHours, inputTarget: number ): Result => {
  const periodLength : number = weeklyExerciseHours.hours.length;
  const trainingDays : number = weeklyExerciseHours.hours.filter(item=>item > 0).length;
  const average : number = weeklyExerciseHours.hours.reduce((a,b) => (a+b)) / periodLength;
  const target : number = inputTarget;

  const success : boolean = trainingDays === periodLength && average > target;

  const rating : number = 
      (trainingDays === periodLength && average>=target) ? 3 
    : (trainingDays === periodLength || average>=target) ? 2 
    : 1; 

  const ratingDescription : string = 
      (rating === 1) ? 'come on. you can do better' 
    : (rating === 2) ? 'not bad. keep going'
    : (rating === 3) ? 'well done!'
    : 'no rating!';

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

// const {weeklyExerciseHours, target} = parseArgumentExercise(process.argv);
// const result = calculateExercises(weeklyExerciseHours, target);
// console.log({result});
