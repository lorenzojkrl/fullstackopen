// On SO this may also do: import express, { Request, Response } from 'express';
import express = require('express');
const app = express();
app.use(express.json());
import { calculateBmi } from './calculateBmi';

app.get('/hello', (_req: express.Request, res: { send: (arg0: string) => void; }) => {
  res.send('Hello Full Stack!');
});

app.get(`/bmi?`, (req: express.Request, res: express.Response) => {
    const {height, weight} = req.query;

    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
        const bmi : string = calculateBmi(Number(height), Number(weight));
        res.send({
            height: height,
            weight: weight,
            bmi: bmi
        });
      } else {
        
          res
            .status(400)
            .send({ error: "malformatted parameters" });
        
      }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

