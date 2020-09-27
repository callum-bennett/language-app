import CrosswordAnswer from "../models/crosswordAnswer";
import { peopleWords } from "./words";
import { DIR_HORIZONTAL, DIR_VERTICAL } from "../utils/crosswordGenerator";

export const people1 = {
  width: 7,
  height: 10,
  answers: [
    new CrosswordAnswer(peopleWords[0].name, 10, 3, DIR_HORIZONTAL, 8), // yo
    new CrosswordAnswer(peopleWords[1].name, 2, 1, DIR_HORIZONTAL, 3), // madre
    new CrosswordAnswer(peopleWords[2].name, 1, 2, DIR_VERTICAL, 1), // padre
    new CrosswordAnswer(peopleWords[3].name, 1, 7, DIR_VERTICAL, 2), // nino
    new CrosswordAnswer(peopleWords[4].name, 7, 6, DIR_VERTICAL, 7), // nina
    new CrosswordAnswer(peopleWords[5].name, 4, 4, DIR_HORIZONTAL, 4), // hijo
    new CrosswordAnswer(peopleWords[6].name, 7, 1, DIR_VERTICAL, 6), // hija
    new CrosswordAnswer(peopleWords[7].name, 5, 1, DIR_HORIZONTAL, 5), // bebe
    new CrosswordAnswer(peopleWords[8].name, 7, 1, DIR_HORIZONTAL, 6), // hermana
    new CrosswordAnswer(peopleWords[9].name, 4, 4, DIR_VERTICAL, 4), // hermano
  ],
};
