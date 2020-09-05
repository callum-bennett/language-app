export const arrayToObjectByKey = (array, key = "id") => {
  return array.reduce((object, arrayItem) => {
    object[arrayItem[key]] = arrayItem;
    return object;
  }, {});
};
