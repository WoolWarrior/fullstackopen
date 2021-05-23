import diagnoseEntries from '../../data/diagnosesTs';
import { DiagnoseEntry } from '../types';

const getDiagnoseEntries = (): DiagnoseEntry[] =>{
  return diagnoseEntries;
};

export default {
  getDiagnoseEntries
};