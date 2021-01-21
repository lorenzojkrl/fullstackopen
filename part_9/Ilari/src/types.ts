// export type Weather = "sunny" | "rainy" | "cloudy" | "windy" | "stormy";
// export type Visibility = "great" | "good" | "ok" | "poor";

export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

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

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;

export type NewDiaryEntry = Omit<DiaryEntry, "id">;
