import diaries from "../../data/diaries";
import { DiaryEntry } from "../types";

// Type assertion
// const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>;
// Better to convert diaries.json to ts and export typed diaries

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
