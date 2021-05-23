interface HeightAndWeight {
  height: number;
  weight: number;
}

export const parseArgument = (args : Array<string>): HeightAndWeight => {
  if (args.length !== 4) throw new Error('Arguments number incorrect');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number) : string => {
  const bmi = weight / (height * height / 100 / 100) ;
  if (bmi < 18.5) {
    return 'underweight'; 
  }
  if (bmi < 25) {
    return 'Normal (healthy weight)';
  }
  if (bmi < 30) {
    return 'overweight';
  }
  return 'obese';
};

// try {
//   const {height, weight} = parseArgument(process.argv)
//   calculateBmi(height, weight)
// } catch (e) {
//   console.log('Error, something bad happened, message: ', e.message);
// }
