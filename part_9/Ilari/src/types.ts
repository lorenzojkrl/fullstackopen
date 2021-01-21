export type Weather = "sunny" | "rainy" | "cloudy" | "windy" | "stormy";
export type Visibility = "great" | "good" | "ok" | "poor";
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;

// if we want to be able to save entries without a certain field,
// e.g. comment,
// we could set the type of the field as optional by adding ? to the type declaration:
export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}
