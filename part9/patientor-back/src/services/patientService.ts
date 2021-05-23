import patientEntries from '../../data/patientsTs';
import { PatientEntry, NewPatientEntry, PublicPatient, NewEntry } from '../types';
import {v1 as uuid} from 'uuid';

const getPatientEntries = (): PatientEntry[] => {
  return patientEntries;
};

const getPublicPatient = (): PublicPatient[] => {
  return patientEntries.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, 
    name, 
    dateOfBirth, 
    gender, 
    occupation
  }));
};

const findPatientById = (id: string): PatientEntry | undefined => {
  const entry = patientEntries.find(d => d.id === id);
  return entry;
};

const addNewPatient = ( entry: NewPatientEntry) : PatientEntry => {
  const id = uuid();
  const newPatientEntry = {
    id:id,
    ...entry
  };

  patientEntries.push(newPatientEntry);
  return newPatientEntry;
};

const addNewDiagnosisEntry = ( patientId: string, entry: NewEntry): PatientEntry | undefined=> {
  const id = uuid();
  const newEntry = {
    id: id,
    ...entry
  };
  const patientEntry = patientEntries.find(d => d.id === patientId); 
  patientEntry?.entries?.push(newEntry);
  return patientEntry;
};

export default {
  getPatientEntries, getPublicPatient, findPatientById, addNewPatient, addNewDiagnosisEntry
};