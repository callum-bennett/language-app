import CrosswordCell from "./crosswordCell";

class CrosswordAnswer {
  constructor(text, originY, originX, direction, number) {
    this.text = text;
    this.originX = originX;
    this.originY = originY;
    this.direction = direction;
    this.number = number;

    let x = originX;
    let y = originY;
    const cells = [];

    for (const char of text) {
      if (direction === "v") {
        cells.push(new CrosswordCell(x, y++));
      } else {
        cells.push(new CrosswordCell(x++, y));
      }
    }

    this.cells = cells;
  }
}

export default CrosswordAnswer;
