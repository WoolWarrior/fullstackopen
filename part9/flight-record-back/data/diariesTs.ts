import { DiaryEntry } from "../src/types";
import diaryData from './diariesJson.json';
import toNewDiaryEntry from '../src/utils';

const diaryEntries: Array<DiaryEntry> =diaryData.map(obj => {
  const object = toNewDiaryEntry(obj) as DiaryEntry;
  object.id = obj.id;
  return object;
}) ;

export default diaryEntries;