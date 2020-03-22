import { Piece } from "./Piece";

export const Pawn = (
  i: number,
  j: number,
  canMoveTo: boolean[][],
  Board: (Piece | any)[][],
  turn: String
) => {
  if (turn === "W") {
    // if turn is white, pawns move above.
    if (Board[i - 1][j] === null) {
      canMoveTo[i - 1][j] = true; //Highlighting the box below the pawn.
      if (i === 6 && Board[i - 2][j] === null) canMoveTo[i - 2][j] = true;
    }

    if (j > 0) {
      let left = Board[i - 1][j - 1];
      if (left !== null) {
        let leftUnitColor = left.split("_")[0];
        if (leftUnitColor === "B") canMoveTo[i - 1][j - 1] = true;
      }
    }
    if (j < 7) {
      let right = Board[i - 1][j + 1];
      if (right !== null) {
        let rightUnitColor = right.split("_")[0];
        if (rightUnitColor === "B") canMoveTo[i - 1][j + 1] = true;
      }
    }
  }

  if (turn === "B") {
    // if turn is black, pawns move below.
    if (Board[i + 1][j] === null) {
      canMoveTo[i + 1][j] = true; //Highlighting the box above the pawn.
      if (i === 1 && Board[i + 2][j] === null) canMoveTo[i + 2][j] = true;
    }

    if (j > 0) {
      let left = Board[i + 1][j - 1];
      if (left !== null) {
        let leftUnitColor = left.split("_")[0];
        if (leftUnitColor === "W") canMoveTo[i + 1][j - 1] = true;
      }
    }
    if (j < 7) {
      let right = Board[i + 1][j + 1];
      if (right !== null) {
        let rightUnitColor = right.split("_")[0];
        if (rightUnitColor === "W") canMoveTo[i + 1][j + 1] = true;
      }
    }
  }
};
