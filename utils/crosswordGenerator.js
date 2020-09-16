// const placeWord = (word) => {
//   let attempts = 0;
//
//   return true;
// };
//
// const getLetterAt = (row, col) => {
//   return grid[row][col];
// };

const generateGrid = (size) => {
  let grid = [],
    i = 0;
  while (i < size) {
    let j = 0;
    grid.push([]);

    while (j < size) {
      grid[i].push(null);
      j++;
    }
    i++;
  }
  return grid;
};

export const generateCrossword = (words) => {
  let wordsPlaced = 0;

  const sortedWords = words.sort((a, b) => {
    return a.name.length < b.name.length;
  });

  // const gridSize = sortedWords[0].name.length;
  const gridSize = 12;
  const grid = generateGrid(gridSize);

  // while (wordsPlaced < sortedWords.length) {
  //   const word = sortedWords.unshift();
  //   if (placeWord(word)) {
  //     wordsPlaced++;
  //   }
  // }

  return grid;
};
