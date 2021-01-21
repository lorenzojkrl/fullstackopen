import express from "express";
import diaryService from "../services/diaryService";
import toNewDiaryEntry from "../utils";

const router = express.Router();

router.get("/:id", (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

router.get("/", (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.post("/", (req, res) => {
  // Proofing request
  // Add parsing and validation logic into utils.ts
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);
    const addedEntry = diaryService.addDiary(newDiaryEntry);
    res.json(addedEntry);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
  /*
  const { date, weather, visibility, comment } = req.body;
  const newDiaryEntry = diaryService.addDiary({
    date,
    weather,
    visibility,
    comment,
  });
  res.json(newDiaryEntry);
  */
});

export default router;
