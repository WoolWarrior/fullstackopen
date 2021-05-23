import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findPatientById(req.params.id);
  if(patient){
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addNewPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newDiagnosisEntry = req.body;
    const patientEntry = patientService.addNewDiagnosisEntry(id, newDiagnosisEntry);
    res.json(patientEntry);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

export default router;

