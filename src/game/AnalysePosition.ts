import { Piece } from "./Piece";
import { valueOfPiece, isUnderCheck } from "./pieceLogic";

// These functions are same as the ones in pieceLogic.ts but
// these don't change the pieces' canMoveTo property

export const PawnScore = (i: number, j: number, Board: (Piece | any)[][]) => {
  //   console.log(i, j, Board);
  const turn = Board[i][j].color;
  let importance: number = 50;
  if (turn === "W" && i !== 0) {
    if (j !== 0) {
      const upLeft = Board[i - 1][j - 1];
      if (upLeft && upLeft.color === "B") {
        let newBoard = Board.map((inner) => inner.slice());
        newBoard[i - 1][j - 1] = Board[i][j];
        newBoard[i][j] = null;
        if (!isUnderCheck(newBoard, turn === "W" ? "B" : "W"))
          importance += valueOfPiece(upLeft.type);
      }
      /*
      Removing En Passant for AI for now

        else if (
          // En Passant
          i === 3 &&
          left &&
          left.numOfMoves === 1 &&
          left.turnsSinceLastMove === 0
        ) {
          let newBoard = Board.map((inner) => inner.slice());
          newBoard[i - 1][j - 1] = Board[i][j];
          newBoard[i][j - 1] = null;
          if (!isUnderCheck(newBoard, turn === "W" ? "B" : "W")) {
            importance += valueOfPiece(left.type);
          }
        }
      */
    }
    if (j !== 7) {
      const upRight = Board[i - 1][j + 1];
      const right = Board[i][j + 1];
      if (upRight && upRight.color === "B") {
        let newBoard = Board.map((inner) => inner.slice());
        newBoard[i - 1][j + 1] = Board[i][j];
        newBoard[i][j] = null;
        if (!isUnderCheck(newBoard, turn === "W" ? "B" : "W"))
          importance += valueOfPiece(upRight.type);
      }
      /*
      Removing En Passant for AI for now
      
      else if (
        //  En Passant
        i === 3 &&
        right &&
        right.numOfMoves === 1 &&
        right.turnsSinceLastMove === 0
      ) {
        let newBoard = Board.map((inner) => inner.slice());
        newBoard[i - 1][j + 1] = Board[i][j];
        newBoard[i][j + 1] = null;
        if (!isUnderCheck(newBoard, turn === "W" ? "B" : "W")) {
          canMoveTo[i - 1][j + 1] = true;
          importance += valueOfPiece(right.type);
        }
      }
      */
    }
  }

  if (turn === "B" && i !== 7) {
    if (j !== 0) {
      const upLeft = Board[i + 1][j - 1];
      const left = Board[i][j - 1];
      if (upLeft && upLeft.color === "W") {
        let newBoard = Board.map((inner) => inner.slice());
        newBoard[i + 1][j - 1] = Board[i][j];
        newBoard[i][j] = null;
        if (!isUnderCheck(newBoard, turn === "W" ? "B" : "W"))
          importance += valueOfPiece(upLeft.type);
      }
      /*
      Removing En Passant for AI for now

      else if (
        // EN Passant
        i === 4 &&
        left &&
        left.numOfMoves === 1 &&
        left.turnsSinceLastMove === 0
      ) {
        let newBoard = Board.map((inner) => inner.slice());
        newBoard[i + 1][j - 1] = newBoard[i][j];
        newBoard[i][j - 1] = null;
        if (!isUnderCheck(newBoard, turn === "W" ? "B" : "W"))
          canMoveTo[i + 1][j - 1] = true;
        importance += valueOfPiece(left.type);
      }
      */
    }
    if (j !== 7) {
      const upRight = Board[i + 1][j + 1];
      const right = Board[i][j + 1];
      if (upRight && upRight.color === "W") {
        let newBoard = Board.map((inner) => inner.slice());
        newBoard[i + 1][j + 1] = Board[i][j];
        newBoard[i][j] = null;
        if (!isUnderCheck(newBoard, turn === "W" ? "B" : "W"))
          importance += valueOfPiece(upRight.type);
      }
      /*
      Removing En Passant for AI for now

      else if (
        // En Passant
        i === 4 &&
        right &&
        right.numOfMoves === 1 &&
        right.turnsSinceLastMove === 0
      ) {
        let newBoard = Board.map((inner) => inner.slice());
        newBoard[i + 1][j + 1] = newBoard[i][j];
        newBoard[i][j + 1] = null;
        if (!isUnderCheck(newBoard, turn === "W" ? "B" : "W"))
          canMoveTo[i + 1][j + 1] = true;
        importance += valueOfPiece(right.type);
      }
      */
    }
  }
  importance *= turn === "W" ? 1 : -1;
  Board[i][j].importance = importance;
};
