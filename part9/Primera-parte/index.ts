import express, { Request, Response } from "express";
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from "./calculateExercises";


const app = express();
app.use(express.json())
app.get("/HELLO", (_req: Request, res: Response) => {
  res.send("HELLO FULLSTACK");
});

app.get("/bmi", (req: Request, res: Response) => {
  const { height, weight } = req.query;

  try {
    const heightValue: number = parseFloat(height as string);
    const weightValue: number = parseFloat(weight as string);

    if (isNaN(heightValue) || isNaN(weightValue)) {
      throw Error();
    }

    const bmi: string = calculateBmi(heightValue, weightValue);
    return res.json({
      weight: weightValue,
      height: heightValue,
      bmi
    });
  }
  catch (error) {
    console.error(error);
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;

  const result = calculateExercises(daily_exercises, target)
   res.json(result)
})

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
