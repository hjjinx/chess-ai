import { Piece } from "./Piece";
import { initiallyCanMoveTo } from "./InitialPosition";

// TODO:
// en passant
// Castling
// Pawn promotion
// Stalemate

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
        let leftUnitColor = left.color;
        console.log(leftUnitColor);
        if (leftUnitColor === "B") canMoveTo[i - 1][j - 1] = true;
      }
    }
    if (j < 7) {
      let right = Board[i - 1][j + 1];
      if (right !== null) {
        let rightUnitColor = right.color;
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
        let leftUnitColor = left.color;
        if (leftUnitColor === "W") canMoveTo[i + 1][j - 1] = true;
      }
    }
    if (j < 7) {
      let right = Board[i + 1][j + 1];
      if (right !== null) {
        let rightUnitColor = right.color;
        if (rightUnitColor === "W") canMoveTo[i + 1][j + 1] = true;
      }
    }
  }
};
export const Rook = (
  i: number,
  j: number,
  canMoveTo: boolean[][],
  Board: (Piece | any)[][],
  turn: String
) => {
  if (turn === "W") {
    if (i > 0) {
      for (let r = i - 1; r >= 0; r--) {
        //For boxes above the rook.
        let unit = Board[r][j];
        if (unit === null) canMoveTo[r][j] = true;
        else {
          if (unit.color === "B") {
            //unit[0] is the color of the unit.
            canMoveTo[r][j] = true;
            break;
          } else break;
        }
      }
    }
    if (i < 7) {
      for (let r = i + 1; r <= 7; r++) {
        //For boxes above the rook.
        let unit = Board[r][j];
        if (unit === null) canMoveTo[r][j] = true;
        else {
          if (unit.color === "B") {
            //unit[0] is the color of the unit.
            canMoveTo[r][j] = true;
            break;
          } else break;
        }
      }
    }
    if (j > 0) {
      for (let r = j - 1; r >= 0; r--) {
        //For boxes left to the rook.
        let unit = Board[i][r];
        if (unit === null) canMoveTo[i][r] = true;
        else {
          if (unit.color === "B") {
            //unit[0] is the color of the unit.
            canMoveTo[i][r] = true;
            break;
          } else break;
        }
      }
    }
    if (j < 7) {
      for (let r = j + 1; r <= 7; r++) {
        //For boxes right to the rook.
        let unit = Board[i][r];
        if (unit === null) canMoveTo[i][r] = true;
        else {
          if (unit.color === "B") {
            //unit[0] is the color of the unit.
            canMoveTo[i][r] = true;
            break;
          } else break;
        }
      }
    }
  } else {
    if (i > 0) {
      for (let r = i - 1; r >= 0; r--) {
        //For boxes above the rook.
        let unit = Board[r][j];
        if (unit === null) canMoveTo[r][j] = true;
        else {
          if (unit.color === "W") {
            //unit[0] is the color of the unit.
            canMoveTo[r][j] = true;
            break;
          } else break;
        }
      }
    }
    if (i < 7) {
      for (let r = i + 1; r <= 7; r++) {
        //For boxes above the rook.
        let unit = Board[r][j];
        if (unit === null) canMoveTo[r][j] = true;
        else {
          if (unit.color === "W") {
            //unit[0] is the color of the unit.
            canMoveTo[r][j] = true;
            break;
          } else break;
        }
      }
    }
    if (j > 0) {
      for (let r = j - 1; r >= 0; r--) {
        //For boxes left to the rook.
        let unit = Board[i][r];
        if (unit === null) canMoveTo[i][r] = true;
        else {
          if (unit.color === "W") {
            //unit[0] is the color of the unit.
            canMoveTo[i][r] = true;
            break;
          } else break;
        }
      }
    }
    if (j < 7) {
      for (let r = j + 1; r <= 7; r++) {
        //For boxes right to the rook.
        let unit = Board[i][r];
        if (unit === null) canMoveTo[i][r] = true;
        else {
          if (unit.color === "W") {
            //unit[0] is the color of the unit.
            canMoveTo[i][r] = true;
            break;
          } else break;
        }
      }
    }
  }
};
export const Knight = (
  i: number,
  j: number,
  canMoveTo: boolean[][],
  Board: (Piece | any)[][],
  turn: String
) => {
  if (turn === "W") {
    // First of all, ahead.
    if (i >= 2) {
      //i has to be greater than 1 if the knight has to move ahead. because it moves 2 straight
      // and 1 in the other axis.
      if (j >= 1) {
        let left = Board[i - 2][j - 1];
        if (left === null) canMoveTo[i - 2][j - 1] = true;
        else {
          left = left.color;
          if (left === "B") canMoveTo[i - 2][j - 1] = true;
        }
      }
      if (j <= 6) {
        let right = Board[i - 2][j + 1];
        if (right === null) canMoveTo[i - 2][j + 1] = true;
        else {
          right = right.color;
          if (right === "B") canMoveTo[i - 2][j + 1] = true;
        }
      }
    }

    if (i <= 5) {
      //i has to be less than 6 if the knight has to move below. because it moves 2 straight
      // and 1 in the other axis.
      if (j >= 1) {
        let left = Board[i + 2][j - 1];
        if (left === null) canMoveTo[i + 2][j - 1] = true;
        else {
          left = left.color;
          if (left === "B") canMoveTo[i + 2][j - 1] = true;
        }
      }
      if (j <= 6) {
        let right = Board[i + 2][j + 1];
        if (right === null) canMoveTo[i + 2][j + 1] = true;
        else {
          right = right.color;
          if (right === "B") canMoveTo[i + 2][j + 1] = true;
        }
      }
    }

    if (j >= 2) {
      //i has to be greater than 1 if the knight has to move ahead. because it moves 2 straight
      // and 1 in the other axis.
      if (i >= 1) {
        let left = Board[i - 1][j - 2];
        if (left === null) canMoveTo[i - 1][j - 2] = true;
        else {
          left = left.color;
          if (left === "B") canMoveTo[i - 1][j - 2] = true;
        }
      }
      if (i <= 6) {
        let right = Board[i + 1][j - 2];
        if (right === null) canMoveTo[i + 1][j - 2] = true;
        else {
          right = right.color;
          if (right === "B") canMoveTo[i + 1][j - 2] = true;
        }
      }
    }

    if (j <= 5) {
      //i has to be less than 6 if the knight has to move below. because it moves 2 straight
      // and 1 in the other axis.
      if (i >= 1) {
        let left = Board[i - 1][j + 2];
        if (left === null) canMoveTo[i - 1][j + 2] = true;
        else {
          left = left.color;
          if (left === "B") canMoveTo[i - 1][j + 2] = true;
        }
      }
      if (i <= 6) {
        let right = Board[i + 1][j + 2];
        if (right === null) canMoveTo[i + 1][j + 2] = true;
        else {
          right = right.color;
          if (right === "B") canMoveTo[i + 1][j + 2] = true;
        }
      }
    }
  } else {
    // First of all, ahead.
    if (i >= 2) {
      //i has to be greater than 1 if the knight has to move ahead. because it moves 2 straight
      // and 1 in the other axis.
      if (j >= 1) {
        let left = Board[i - 2][j - 1];
        if (left === null) canMoveTo[i - 2][j - 1] = true;
        else {
          left = left.color;
          if (left === "W") canMoveTo[i - 2][j - 1] = true;
        }
      }
      if (j <= 6) {
        let right = Board[i - 2][j + 1];
        if (right === null) canMoveTo[i - 2][j + 1] = true;
        else {
          right = right.color;
          if (right === "W") canMoveTo[i - 2][j + 1] = true;
        }
      }
    }

    if (i <= 5) {
      //i has to be less than 6 if the knight has to move below. because it moves 2 straight
      // and 1 in the other axis.
      if (j >= 1) {
        let left = Board[i + 2][j - 1];
        if (left === null) canMoveTo[i + 2][j - 1] = true;
        else {
          left = left.color;
          if (left === "W") canMoveTo[i + 2][j - 1] = true;
        }
      }
      if (j <= 6) {
        let right = Board[i + 2][j + 1];
        if (right === null) canMoveTo[i + 2][j + 1] = true;
        else {
          right = right.color;
          if (right === "W") canMoveTo[i + 2][j + 1] = true;
        }
      }
    }

    if (j >= 2) {
      //i has to be greater than 1 if the knight has to move ahead. because it moves 2 straight
      // and 1 in the other axis.
      if (i >= 1) {
        let left = Board[i - 1][j - 2];
        if (left === null) canMoveTo[i - 1][j - 2] = true;
        else {
          left = left.color;
          if (left === "W") canMoveTo[i - 1][j - 2] = true;
        }
      }
      if (j <= 6) {
        let right = Board[i + 1][j - 2];
        if (right === null) canMoveTo[i + 1][j - 2] = true;
        else {
          right = right.color;
          if (right === "W") canMoveTo[i + 1][j - 2] = true;
        }
      }
    }

    if (j <= 5) {
      //i has to be less than 6 if the knight has to move below. because it moves 2 straight
      // and 1 in the other axis.
      if (i >= 1) {
        let left = Board[i - 1][j + 2];
        if (left === null) canMoveTo[i - 1][j + 2] = true;
        else {
          left = left.color;
          if (left === "W") canMoveTo[i - 1][j + 2] = true;
        }
      }
      if (i <= 6) {
        let right = Board[i + 1][j + 2];
        if (right === null) canMoveTo[i + 1][j + 2] = true;
        else {
          right = right.color;
          if (right === "W") canMoveTo[i + 1][j + 2] = true;
        }
      }
    }
  }
};
export const Bishop = (
  i: number,
  j: number,
  canMoveTo: boolean[][],
  Board: (Piece | any)[][],
  turn: String
) => {
  //bishop can move in 4 directions.
  if (turn === "W") {
    for (let r = 1; r < 8; r++) {
      // right top.
      if (i - r >= 0 && j + r <= 7) {
        let unit = Board[i - r][j + r];
        if (unit === null) canMoveTo[i - r][j + r] = true;
        else {
          unit = unit.color;
          if (unit === "B") {
            canMoveTo[i - r][j + r] = true;
            break;
          } else break;
        }
      }
    }

    for (let r = 1; r < 8; r++) {
      // right bottom.
      if (i + r <= 7 && j + r <= 7) {
        let unit = Board[i + r][j + r];
        if (unit === null) canMoveTo[i + r][j + r] = true;
        else {
          unit = unit.color;
          if (unit === "B") {
            canMoveTo[i + r][j + r] = true;
            break;
          } else break;
        }
      }
    }

    for (let r = 1; r < 8; r++) {
      // left bottom.
      if (i + r <= 7 && j - r >= 0) {
        let unit = Board[i + r][j - r];
        if (unit === null) canMoveTo[i + r][j - r] = true;
        else {
          unit = unit.color;
          if (unit === "B") {
            canMoveTo[i + r][j - r] = true;
            break;
          } else break;
        }
      }
    }

    for (let r = 1; r < 8; r++) {
      // left top.
      if (i - r >= 0 && j - r >= 0) {
        let unit = Board[i - r][j - r];
        if (unit === null) canMoveTo[i - r][j - r] = true;
        else {
          unit = unit.color;
          if (unit === "B") {
            canMoveTo[i - r][j - r] = true;
            break;
          } else break;
        }
      }
    }
  } else {
    for (let r = 1; r < 8; r++) {
      // right top.
      if (i - r >= 0 && j + r <= 7) {
        let unit = Board[i - r][j + r];
        if (unit === null) canMoveTo[i - r][j + r] = true;
        else {
          unit = unit.color;
          if (unit === "W") {
            canMoveTo[i - r][j + r] = true;
            break;
          } else break;
        }
      }
    }

    for (let r = 1; r < 8; r++) {
      // right bottom.
      if (i + r <= 7 && j + r <= 7) {
        let unit = Board[i + r][j + r];
        if (unit === null) canMoveTo[i + r][j + r] = true;
        else {
          unit = unit.color;
          if (unit === "W") {
            canMoveTo[i + r][j + r] = true;
            break;
          } else break;
        }
      }
    }

    for (let r = 1; r < 8; r++) {
      // left bottom.
      if (i + r <= 7 && j - r >= 0) {
        let unit = Board[i + r][j - r];
        if (unit === null) canMoveTo[i + r][j - r] = true;
        else {
          unit = unit.color;
          if (unit === "W") {
            canMoveTo[i + r][j - r] = true;
            break;
          } else break;
        }
      }
    }

    for (let r = 1; r < 8; r++) {
      // left top.
      if (i - r >= 0 && j - r >= 0) {
        let unit = Board[i - r][j - r];
        if (unit === null) canMoveTo[i - r][j - r] = true;
        else {
          unit = unit.color;
          if (unit === "W") {
            canMoveTo[i - r][j - r] = true;
            break;
          } else break;
        }
      }
    }
  }
};
export const King = (
  i: number,
  j: number,
  canMoveTo: boolean[][],
  Board: (Piece | any)[][],
  turn: String
) => {
  if (turn === "W") {
    if (i >= 1) {
      let unit = Board[i - 1][j];
      if (unit === null) canMoveTo[i - 1][j] = true;
      else {
        unit = unit.color;
        if (unit === "B") canMoveTo[i - 1][j] = true;
      }

      if (j >= 1) {
        let unit = Board[i - 1][j - 1];
        if (unit === null) canMoveTo[i - 1][j - 1] = true;
        else {
          unit = unit.color;
          if (unit === "B") canMoveTo[i - 1][j - 1] = true;
        }
      }
      if (j <= 6) {
        let unit = Board[i - 1][j + 1];
        if (unit === null) canMoveTo[i - 1][j + 1] = true;
        else {
          unit = unit.color;
          if (unit === "B") canMoveTo[i - 1][j + 1] = true;
        }
      }
    }

    if (i <= 6) {
      let unit = Board[i + 1][j];
      if (unit === null) canMoveTo[i + 1][j] = true;
      else {
        unit = unit.color;
        if (unit === "B") canMoveTo[i + 1][j] = true;
      }

      if (j >= 1) {
        let unit = Board[i + 1][j - 1];
        if (unit === null) canMoveTo[i + 1][j - 1] = true;
        else {
          unit = unit.color;
          if (unit === "B") canMoveTo[i + 1][j - 1] = true;
        }
      }
      if (j <= 6) {
        let unit = Board[i + 1][j + 1];
        if (unit === null) canMoveTo[i + 1][j + 1] = true;
        else {
          unit = unit.color;
          if (unit === "B") canMoveTo[i + 1][j + 1] = true;
        }
      }
    }

    if (j >= 1) {
      let unit = Board[i][j - 1];
      if (unit === null) canMoveTo[i][j - 1] = true;
      else {
        unit = unit.color;
        if (unit === "B") canMoveTo[i][j - 1] = true;
      }
    }

    if (j <= 6) {
      let unit = Board[i][j + 1];
      if (unit === null) canMoveTo[i][j + 1] = true;
      else {
        unit = unit.color;
        if (unit === "B") canMoveTo[i][j + 1] = true;
      }
    }
  } else {
    if (i >= 1) {
      let unit = Board[i - 1][j];
      if (unit === null) canMoveTo[i - 1][j] = true;
      else {
        unit = unit.color;
        if (unit === "W") canMoveTo[i - 1][j] = true;
      }

      if (j >= 1) {
        let unit = Board[i - 1][j - 1];
        if (unit === null) canMoveTo[i - 1][j - 1] = true;
        else {
          unit = unit.color;
          if (unit === "W") canMoveTo[i - 1][j - 1] = true;
        }
      }
      if (j <= 6) {
        let unit = Board[i - 1][j + 1];
        if (unit === null) canMoveTo[i - 1][j + 1] = true;
        else {
          unit = unit.color;
          if (unit === "W") canMoveTo[i - 1][j + 1] = true;
        }
      }
    }

    if (i <= 6) {
      let unit = Board[i + 1][j];
      if (unit === null) canMoveTo[i + 1][j] = true;
      else {
        unit = unit.color;
        if (unit === "W") canMoveTo[i + 1][j] = true;
      }

      if (j >= 1) {
        let unit = Board[i + 1][j - 1];
        if (unit === null) canMoveTo[i + 1][j - 1] = true;
        else {
          unit = unit.color;
          if (unit === "W") canMoveTo[i + 1][j - 1] = true;
        }
      }
      if (j <= 6) {
        let unit = Board[i + 1][j + 1];
        if (unit === null) canMoveTo[i + 1][j + 1] = true;
        else {
          unit = unit.color;
          if (unit === "W") canMoveTo[i + 1][j + 1] = true;
        }
      }
    }

    if (j >= 1) {
      let unit = Board[i][j - 1];
      if (unit === null) canMoveTo[i][j - 1] = true;
      else {
        unit = unit.color;
        if (unit === "W") canMoveTo[i][j - 1] = true;
      }
    }

    if (j <= 6) {
      let unit = Board[i][j + 1];
      if (unit === null) canMoveTo[i][j + 1] = true;
      else {
        unit = unit.color;
        if (unit === "W") canMoveTo[i][j + 1] = true;
      }
    }
  }
};

export const pieceStateUpdate = (board: (Piece | any)[][]) => {
  console.log(board);
  let isGivingCheck: number[][];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j]) {
        board[i][j].canMoveTo = initiallyCanMoveTo.map(inner => inner.slice());
        switch (board[i][j].type) {
          case "Pawn":
            const isGivingCheckOrNot = Pawn(
              i,
              j,
              board[i][j].canMoveTo,
              board,
              board[i][j].color
            );
            // if (isGivingCheckOrNot) isGivingCheck.push([i, j]);
            // console.log(board[i][j].canMoveTo);
            break;
          case "Bishop":
            Bishop(i, j, board[i][j].canMoveTo, board, board[i][j].color);
            break;
          case "King":
            King(i, j, board[i][j].canMoveTo, board, board[i][j].color);
            break;
          case "Queen":
            Bishop(i, j, board[i][j].canMoveTo, board, board[i][j].color);
            Rook(i, j, board[i][j].canMoveTo, board, board[i][j].color);
            break;
          case "Rook":
            Rook(i, j, board[i][j].canMoveTo, board, board[i][j].color);
            break;
          case "Knight":
            Knight(i, j, board[i][j].canMoveTo, board, board[i][j].color);
            break;
        }
      }
    }
  }
  return isGivingCheck;
};
