import diaryData from "../../data/diaries.json";
import { DiaryEntry } from "../types";

// Type assertion
const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>;

const getEntries = (): Array<DiaryEntry> => {
  return diaries;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
};
