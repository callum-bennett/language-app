export * from "./crosswordGenerator";
export * from "./sounds";

export const arrayToObjectByKey = (array, key = "id") =>
  array.reduce((object, arrayItem) => {
    object[arrayItem[key]] = arrayItem;
    return object;
  }, {});
