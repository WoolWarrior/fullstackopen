import express from 'express';
import diaryService from '../services/diaryService';
import toNewDiaryEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diaryService.getEntries());
});

router.post('/', (req, res) => {
  const newDiaryEntry = toNewDiaryEntry(req.body);
  const addedEntry = diaryService.addDiary(
    newDiaryEntry
  );
  res.send(addedEntry);
});

router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if(diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

export default router;