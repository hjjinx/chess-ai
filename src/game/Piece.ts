export class Piece {
  constructor(type: String, color: String) {
    this.type = type;
    this.color = color;
  }

  type: String = "";
  color: String = "";
  canMoveTo: boolean[][] = [
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
  ];
  numOfMoves: number = 0;
  turnsSinceLastMove: number = 0;
}
