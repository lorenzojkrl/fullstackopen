/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewDiaryEntry, Weather, Visibility } from "./types";

// Validate comment is string

// The function is a so called type guard.
// I.e. is a function which returns a boolean and
// which has a type predicate as the return type.
// In our case the type predicate is text is string
// The general form of a type predicate is parameterName is Type
const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};
/* Why do we have two conditions in the string type guard?
  const a = "I'm a string primitive";
  const b = new String("I'm a String Object");
  typeof a; --> returns 'string'
  typeof b; --> returns 'object'
  a instanceof String; --> returns false
  b instanceof String; --> returns true
  */

/* If the type guard function returns true, 
  the TypeScript compiler knows that the tested variable has the type that was defined in the type predicate.
  Before the type guard is called, the actual type of the variable comment is not known.
  But after the call, if the code proceeds past the exception (that is the type guard returned true), 
  compiler knows that comment is of the type string
  */
const parseComment = (comment: any): string => {
  if (!comment || !isString(comment)) {
    throw new Error("Incorrect or missing comment:" + String(comment));
  }

  return comment;
};

//   Validate date is string
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + String(date));
  }
  return date;
};

//   Validate weather is string

/*
  This would work just fine, but the list of possible weathers 
  does not necessarily stay in sync with the type definitions 
  if the type is altered. This isn't good, since 
  we would like to have just one source for all possible weather types.

  In our case a solution is to improve the actual Weather type. 
  Instead of a type alias we should use the TypeScript enum, 
  which allows us to use the actual values in our code in runtime, 
  not only in the compilation phase.
  Redefine type Weather to be enum
  */
//   const isWeather = (str: string): str is Weather => {
//     return ["sunny", "rainy", "cloudy", "stormy"].includes(str);
//   };

// Enums are usually used when there is a set of predetermined values which are not expected to change in the future.
// Usually enums are used for much tighter unchanging values (for example weekdays, months, directions) but since they offer us a great way to validate our incoming values we might as well use them in our case.
const isWeather = (param: any): param is Weather => {
  return Object.values(Weather).includes(param);
};

const parseWeather = (weather: any): Weather => {
  if (!weather || !isWeather(weather)) {
    throw new Error("Incorrect or missing weather: " + String(weather));
  }
  return weather;
};

//   Validate visibility is string
const isVisibility = (param: any): param is Visibility => {
  return Object.values(Visibility).includes(param);
};

const parseVisibility = (visibility: any): Visibility => {
  if (!visibility || !isVisibility(visibility)) {
    throw new Error("Incorrect or missing visibility: " + String(visibility));
  }
  return visibility;
};

const toNewDiaryEntry = (object: any): NewDiaryEntry => {
  return {
    date: parseDate(object.date),
    comment: parseComment(object.comment),
    weather: parseWeather(object.weather),
    visibility: parseVisibility(object.visibility),
  };
};

export default toNewDiaryEntry;
