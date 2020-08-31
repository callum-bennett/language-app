import category from "../models/category";

export default [
  new category(
    1,
    "Top 100 words",
    require("../assets/images/top100.jpg"),
    "#f54336"
  ),
  new category(2, "People", require("../assets/images/people.jpg"), "#d836f5"),
  new category(3, "Travel", require("../assets/images/travel.jpg"), "#2cb80c"),
  new category(
    4,
    "Numbers",
    require("../assets/images/numbers.jpg"),
    "#2735f5"
  ),
];
