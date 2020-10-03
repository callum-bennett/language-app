import CrosswordAnswer from "../models/crosswordAnswer";
import { DIR_HORIZONTAL, DIR_VERTICAL } from "../utils/crosswordGenerator";

export const people1 = {
  width: 7,
  height: 10,
  answers: [
    new CrosswordAnswer("yo", 10, 3, DIR_HORIZONTAL, 8),
    new CrosswordAnswer("madre", 2, 1, DIR_HORIZONTAL, 3),
    new CrosswordAnswer("padre", 1, 2, DIR_VERTICAL, 1),
    new CrosswordAnswer("niño", 1, 7, DIR_VERTICAL, 2),
    new CrosswordAnswer("niña", 7, 6, DIR_VERTICAL, 7),
    new CrosswordAnswer("hijo", 4, 4, DIR_HORIZONTAL, 4),
    new CrosswordAnswer("hija", 7, 1, DIR_VERTICAL, 6),
    new CrosswordAnswer("bebé", 5, 1, DIR_HORIZONTAL, 5),
    new CrosswordAnswer("hermana", 7, 1, DIR_HORIZONTAL, 6),
    new CrosswordAnswer("hermano", 4, 4, DIR_VERTICAL, 4),
  ],
};
