export const DIR_HORIZONTAL = "h";
export const DIR_VERTICAL = "v";

export const drawCrossword = (crosswordConfig) => {
  const { width, height, answers } = crosswordConfig;
  const grid = generateGrid(width, height);
  for (let answer of answers) {
    addAnswer(grid, answer);
  }
  return grid;
};

const generateGrid = (width, height) => {
  let grid = [];
  let i = 0;
  while (i < height) {
    let j = 0;
    grid.push([]);
    while (j < width) {
      grid[i].push(null);
      j++;
    }
    i++;
  }

  return grid;
};

const addAnswer = (grid, answer) => {
  const { text, number, direction, originX, originY } = answer;
  let x = originX - 1;
  let y = originY - 1;
  let i = 0;

  for (let char of answer.text) {
    if (grid[y][x] === null) {
      grid[y][x] = {
        number: i === 0 ? number : null,
        answers: [text],
        correctValue: char,
      };
    } else {
      grid[y][x].answers.push(text);
    }

    if (direction === DIR_HORIZONTAL) {
      x++;
    } else {
      y++;
    }

    i++;
  }
};
