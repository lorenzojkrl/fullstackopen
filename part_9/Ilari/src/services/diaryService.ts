/*
We won't be writing the code for the actual data manipulations on the router. 
We will create a service which takes care of the data manipulation instead. 
It is quite common practice to separate the "business logic" 
from the router code into its own modules, 
which are quite often called services. 
*/
import diaries from "../../data/diaries";
import { NonSensitiveDiaryEntry, DiaryEntry } from "../types";

// Type assertion
// const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>;
// Better to convert diaries.json to ts and export typed diaries

const getEntries = (): Array<DiaryEntry> => {
  return diaries;
};

// 1
// Pick utility type allows to choose which fields of an existing type we want to use.
// Pick can be used to either construct a completely new type,
// or to inform a function what it should return on runtime.
// Utility types are a special kinds of type tools,
// but they can be used just like regular types.
// const getNonSensitiveEntries = (): Array<
//   Pick<DiaryEntry, "id" | "date" | "weather" | "visibility">
// > => {
//   return [
//     {
//       id: 1,
//       date: "2017-01-01",
//       weather: "rainy",
//       visibility: "poor",
//       //   comment: "This can't be returned!",
//     },
//   ];
// };

// 2
// Since Pick requires the type it modifies to be given as a type variable,
// just like Array does, we now have two nested type variables
// and the syntax is starting to look a bit odd.
// We can improve the code's readability by using the alternative array syntax:
// const getNonSensitiveEntries =
//   (): Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>[] => {
//     // ...
//   }

// 3
// In this case we want to exclude only one field,
// so even better would be to use the Omit utility type
// const getNonSensitiveEntries = (): Omit<DiaryEntry, 'comment'>[] => {
//     // ...
//   }

// 4
// Another way: declare a completely new type for the NonSensitiveDiaryEntry:
// export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

// const addEntry = () => {
//   return null;
// };

export default {
  getEntries,
  // addEntry,
  getNonSensitiveEntries,
};
