import CrosswordAnswer from "../models/crosswordAnswer";
import { DIR_HORIZONTAL, DIR_VERTICAL } from "../utils/crosswordGenerator";

export const crosswordConfig = {
  family: [
    {
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
        new CrosswordAnswer("bebe", 5, 1, DIR_HORIZONTAL, 5),
        new CrosswordAnswer("hermana", 7, 1, DIR_HORIZONTAL, 6),
        new CrosswordAnswer("hermano", 4, 4, DIR_VERTICAL, 4),
      ],
    },

    {
      width: 11,
      height: 13,
      answers: [
        new CrosswordAnswer("abuelo", 7, 6, DIR_HORIZONTAL, 7),
        new CrosswordAnswer("abuela", 8, 5, DIR_VERTICAL, 9),
        new CrosswordAnswer("primo", 2, 2, DIR_HORIZONTAL, 2),
        new CrosswordAnswer("prima", 4, 5, DIR_HORIZONTAL, 5),
        new CrosswordAnswer("sobrino", 4, 2, DIR_VERTICAL, 4),
        new CrosswordAnswer("sobrina", 1, 6, DIR_VERTICAL, 1),
        new CrosswordAnswer("nieto", 3, 11, DIR_VERTICAL, 3),
        new CrosswordAnswer("nieta", 8, 1, DIR_HORIZONTAL, 8),
        new CrosswordAnswer("cuñado", 6, 8, DIR_VERTICAL, 6),
        new CrosswordAnswer("cuñada", 10, 4, DIR_HORIZONTAL, 10),
      ],
    },
  ],
  travel: [
    {
      width: 11,
      height: 12,
      answers: [
        new CrosswordAnswer("autobús", 10, 5, DIR_HORIZONTAL, 10),
        new CrosswordAnswer("carro", 4, 3, DIR_VERTICAL, 5),
        new CrosswordAnswer("tren", 1, 8, DIR_VERTICAL, 2),
        new CrosswordAnswer("aeropuerto", 6, 1, DIR_HORIZONTAL, 6),
        new CrosswordAnswer("viajar", 4, 1, DIR_VERTICAL, 4),
        new CrosswordAnswer("playa", 6, 5, DIR_VERTICAL, 7),
        new CrosswordAnswer("hotel", 8, 7, DIR_VERTICAL, 8),
        new CrosswordAnswer("vacación", 4, 1, DIR_HORIZONTAL, 3),
        new CrosswordAnswer("subte", 8, 9, DIR_VERTICAL, 9),
        new CrosswordAnswer("taxi", 1, 6, DIR_VERTICAL, 1),
      ],
    },
  ],
};
