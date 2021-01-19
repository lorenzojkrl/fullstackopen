const express = require('express');
const app = express();
app.use(express.json());
import { calculateBmi } from './calculateBmi'

app.get('/hello', (_req: any, res: { send: (arg0: string) => void; }) => {
  res.send('Hello Full Stack!');
});

app.get(`/bmi?`, (req: any, res: any) => {
    const {height, weight} = req.query;

    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
        let bmi : string = calculateBmi(Number(height), Number(weight))
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
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

