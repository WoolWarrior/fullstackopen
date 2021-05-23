import express from 'express';
import {calculateBmi} from './calculateBmi';
import { calculateExercises, WeeklyExerciseHours, Result } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack! ');
});

app.get('/bmi', (_req, res) => {
  const {height, weight} = _req.query;
  console.log({height, weight});
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const bmi = calculateBmi(Number(height),Number(weight));
    res.json({
      weight: weight,
      height: height,
      bmi: bmi
    });
    res.send();
  } else {
    res.json({error: "malformatted parameters"});
    res.send();
  }

});

app.post('/', (_req, res) => {
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const body = _req.body;
  if (body.target === undefined || body.daily_exercises === undefined) {
    res.json({error: "parameters missing"});
  } else {
    if(isNaN(Number(body.target))){
      res.json({error: "malformatted parameters"});
    }
    try {
      const inputTarget = Number(body.target);
      const weeklyExerciseHours: WeeklyExerciseHours = {hours:body.daily_exercises};
      const result: Result = calculateExercises(weeklyExerciseHours, inputTarget);
      res.json(result);
    } catch (e) {
      res.json({error: "malformatted parameters"});
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});