export class Piece {
  constructor(
    type: "King" | "Rook" | "Knight" | "Bishop" | "Pawn" | "Queen",
    color: "W" | "B"
  ) {
    this.type = type;
    this.color = color;
    if (type === "King") this.importance = 10000;
    else if (type === "Queen") this.importance = 1000;
    else if (type === "Knight") this.importance = 200;
    else if (type === "Rook") this.importance = 150;
    else if (type === "Bishop") this.importance = 150;
    else this.importance = 50;
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
  importance: number;
}
