import { Piece } from "./Piece";
import { initiallyCanMoveTo } from "./InitialPosition";

// TODO:
// en passant
// Stalemate

// Done:
// Castling
// Pawn promotion

export const Rook = (
  i: number,
  j: number,
  canMoveTo: boolean[][],
  Board: (Piece | any)[][],
  turn: String
) => {
  const doesThisHorizontalMoveResultInCheck = (i: number, r: number) => {
    // If the new state of the board after the move happens results in the player being under check,
    // then that move will not be possible.
    let newBoard = Board.map((inner) => inner.slice());
    newBoard[i][r] = newBoard[i][j];
    newBoard[i][j] = null;
    return isUnderCheck(newBoard, turn === "W" ? "B" : "W");
  };
  const doesThisVerticalMoveResultInCheck = (r: number, j: number) => {
    // If the new state of the board after the move happens results in the player being under check,
    // then that move will not be possible.
    let newBoard = Board.map((inner) => inner.slice());
    newBoard[r][j] = newBoard[i][j];
    newBoard[i][j] = null;
    return isUnderCheck(newBoard, turn === "W" ? "B" : "W");
  };

  let isGivingCheck: boolean = false;
  if (i !== 0) {
    for (let r = i - 1; r >= 0; r--) {
      //For boxes above the rook.
      const piece = Board[r][j];

      if (piece) {
        if (piece.color === turn) break;
        if (doesThisVerticalMoveResultInCheck(r, j)) break;
      } else if (doesThisVerticalMoveResultInCheck(r, j)) continue;

      if (piece === null) canMoveTo[r][j] = true;
      else {
        if (piece.color !== turn) {
          if (piece.type === "King") isGivingCheck = true;
          canMoveTo[r][j] = true;
        }
        break;
      }
    }
  }
  if (i !== 7) {
    for (let r = i + 1; r <= 7; r++) {
      //For boxes below the rook.
      const piece = Board[r][j];

      if (piece) {
        if (piece.color === turn) break;
        if (doesThisVerticalMoveResultInCheck(r, j)) break;
      } else if (doesThisVerticalMoveResultInCheck(r, j)) continue;

      if (piece === null) canMoveTo[r][j] = true;
      else {
        if (piece.color !== turn) {
          if (piece.type === "King") isGivingCheck = true;
          canMoveTo[r][j] = true;
        }
        break;
      }
    }
  }
  if (j !== 0) {
    for (let r = j - 1; r >= 0; r--) {
      //For boxes left to the rook.
      const piece = Board[i][r];

      if (piece) {
        if (piece.color === turn) break;
        if (doesThisHorizontalMoveResultInCheck(i, r)) break;
      } else if (doesThisHorizontalMoveResultInCheck(i, r)) continue;

      if (piece === null) canMoveTo[i][r] = true;
      else {
        if (piece.color !== turn) {
          if (piece.type === "King") isGivingCheck = true;
          canMoveTo[i][r] = true;
        }
        break;
      }
    }
  }
  if (j !== 7) {
    for (let r = j + 1; r <= 7; r++) {
      //For boxes right to the rook.
      const piece = Board[i][r];

      if (piece) {
        if (piece.color === turn) break;
        if (doesThisHorizontalMoveResultInCheck(i, r)) break;
      } else if (doesThisHorizontalMoveResultInCheck(i, r)) continue;

      if (piece === null) canMoveTo[i][r] = true;
      else {
        if (piece.color !== turn) {
          if (piece.type === "King") isGivingCheck = true;
          canMoveTo[i][r] = true;
          break;
        } else break;
      }
    }
  }
  return isGivingCheck;
};
export const Knight = (
  i: number,
  j: number,
  canMoveTo: boolean[][],
  Board: (Piece | any)[][],
  turn: String
) => {
  let isGivingCheck: boolean = false;
  // This covers the 2 cases:
  // Knight moving 2 straight up and 1 left,
  // Knight moving 2 straight up and 1 right,
  if (i >= 2) {
    // i has to be greater than 1 if the knight has to move ahead. because it moves 2 straight
    // and 1 in the other axis.
    if (j >= 1) {
      let left = Board[i - 2][j - 1];
      let thisMoveWillResultInCheck = false;

      if (!left || left.color !== Board[i][j].color) {
        let newBoard = Board.map((inner) => inner.slice());
        newBoard[i - 2][j - 1] = newBoard[i][j];
        newBoard[i][j] = null;
        thisMoveWillResultInCheck = isUnderCheck(
          newBoard,
          turn === "W" ? "B" : "W"
        );
      }
      if (!thisMoveWillResultInCheck) {
        if (left === null) canMoveTo[i - 2][j - 1] = true;
        else {
          if (left.color !== turn) {
            canMoveTo[i - 2][j - 1] = true;
            if (left.type === "King") isGivingCheck = true;
          }
        }
      }
    }
    if (j <= 6) {
      let right = Board[i - 2][j + 1];
      let thisMoveWillResultInCheck = false;

      if (!right || right.color !== Board[i][j].color) {
        let newBoard = Board.map((inner) => inner.slice());
        newBoard[i - 2][j + 1] = newBoard[i][j];
        newBoard[i][j] = null;
        thisMoveWillResultInCheck = isUnderCheck(
          newBoard,
          turn === "W" ? "B" : "W"
        );
      }
      if (!thisMoveWillResultInCheck) {
        if (right === null) canMoveTo[i - 2][j + 1] = true;
        else {
          if (right.color !== turn) {
            canMoveTo[i - 2][j + 1] = true;
            if (right.type === "King") isGivingCheck = true;
          }
        }
      }
    }
  }
  // This covers the 2 cases:
  // Knight moving 2 straight down and 1 left,
  // Knight moving 2 straight down and 1 right,
  if (i <= 5) {
    // i has to be less than 6 if the knight has to move below. because it moves 2 straight
    // and 1 in the other axis.
    if (j >= 1) {
      let left = Board[i + 2][j - 1];
      let thisMoveWillResultInCheck = false;

      if (!left || left.color !== Board[i][j].color) {
        let newBoard = Board.map((inner) => inner.slice());
        newBoard[i + 2][j - 1] = newBoard[i][j];
        newBoard[i][j] = null;
        thisMoveWillResultInCheck = isUnderCheck(
          newBoard,
          turn === "W" ? "B" : "W"
        );
      }

      if (!thisMoveWillResultInCheck) {
        if (left === null) canMoveTo[i + 2][j - 1] = true;
        else {
          if (left.color !== turn) {
            canMoveTo[i + 2][j - 1] = true;
            if (left.type === "King") isGivingCheck = true;
          }
        }
      }
    }
    if (j <= 6) {
      let right = Board[i + 2][j + 1];
      let thisMoveWillResultInCheck = false;

      if (!right || right.color !== Board[i][j].color) {
        let newBoard = Board.map((inner) => inner.slice());
        newBoard[i + 2][j + 1] = newBoard[i][j];
        newBoard[i][j] = null;
        thisMoveWillResultInCheck = isUnderCheck(
          newBoard,
          turn === "W" ? "B" : "W"
        );
      }

      if (!thisMoveWillResultInCheck) {
        if (right === null) canMoveTo[i + 2][j + 1] = true;
        else {
          if (right.color !== turn) {
            canMoveTo[i + 2][j + 1] = true;
            if (right.type === "King") isGivingCheck = true;
          }
        }
      }
    }
  }

  // This covers the 2 cases:
  // Knight moving 2 left and 1 up,
  // Knight moving 2 left and 1 down,
  if (j >= 2) {
    //i has to be greater than 1 if the knight has to move ahead. because it moves 2 straight
    // and 1 in the other axis.
    if (i >= 1) {
      let left = Board[i - 1][j - 2];
      let thisMoveWillResultInCheck = false;

      if (!left || left.color !== Board[i][j].color) {
        let newBoard = Board.map((inner) => inner.slice());
        newBoard[i - 1][j - 2] = newBoard[i][j];
        newBoard[i][j] = null;
        thisMoveWillResultInCheck = isUnderCheck(
          newBoard,
          turn === "W" ? "B" : "W"
        );
      }
      if (!thisMoveWillResultInCheck) {
        if (left === null) canMoveTo[i - 1][j - 2] = true;
        else {
          if (left.color !== turn) {
            canMoveTo[i - 1][j - 2] = true;
            if (left.type === "King") isGivingCheck = true;
          }
        }
      }
    }
    if (i <= 6) {
      let right = Board[i + 1][j - 2];
      let thisMoveWillResultInCheck = false;

      if (!right || right.color !== Board[i][j].color) {
        let newBoard = Board.map((inner) => inner.slice());
        newBoard[i + 1][j - 2] = newBoard[i][j];
        newBoard[i][j] = null;
        thisMoveWillResultInCheck = isUnderCheck(
          newBoard,
          turn === "W" ? "B" : "W"
        );
      }

      if (!thisMoveWillResultInCheck) {
        if (right === null) canMoveTo[i + 1][j - 2] = true;
        else {
          if (right.color !== turn) {
            canMoveTo[i + 1][j - 2] = true;
            if (right.type === "King") isGivingCheck = true;
          }
        }
      }
    }
  }

  if (j <= 5) {
    //i has to be less than 6 if the knight has to move below. because it moves 2 straight
    // and 1 in the other axis.
    if (i >= 1) {
      let left = Board[i - 1][j + 2];
      let thisMoveWillResultInCheck = false;

      if (!left || left.color !== Board[i][j].color) {
        let newBoard = Board.map((inner) => inner.slice());
        newBoard[i - 1][j + 2] = newBoard[i][j];
        newBoard[i][j] = null;
        thisMoveWillResultInCheck = isUnderCheck(
          newBoard,
          turn === "W" ? "B" : "W"
        );
      }
      if (!thisMoveWillResultInCheck) {
        if (left === null) canMoveTo[i - 1][j + 2] = true;
        else {
          if (left.color !== turn) {
            canMoveTo[i - 1][j + 2] = true;
            if (left.type === "King") isGivingCheck = true;
          }
        }
      }
    }
    if (i <= 6) {
      let right = Board[i + 1][j + 2];
      let thisMoveWillResultInCheck = false;

      if (!right || right.color !== Board[i][j].color) {
        let newBoard = Board.map((inner) => inner.slice());
        newBoard[i + 1][j + 2] = newBoard[i][j];
        newBoard[i][j] = null;
        thisMoveWillResultInCheck = isUnderCheck(
          newBoard,
          turn === "W" ? "B" : "W"
        );
      }

      if (!thisMoveWillResultInCheck) {
        if (right === null) canMoveTo[i + 1][j + 2] = true;
        else {
          if (right.color !== turn) {
            canMoveTo[i + 1][j + 2] = true;
            if (right.type === "King") isGivingCheck = true;
          }
        }
      }
    }
  }
  return isGivingCheck;
};
export const Bishop = (
  i: number,
  j: number,
  canMoveTo: boolean[][],
  Board: (Piece | any)[][],
  turn: String
) => {
  let isGivingCheck = false;

  //bishop can move in 4 directions.
  for (let r = 1; r < 8; r++) {
    // up-right.

    const isUnderCheckIfThisMoveHappens = (r: number) => {
      let newBoard = Board.map((inner) => inner.slice());
      newBoard[i - r][j + r] = newBoard[i][j];
      newBoard[i][j] = null;
      return isUnderCheck(newBoard, turn === "W" ? "B" : "W");
    };

    if (i - r >= 0 && j + r <= 7) {
      const piece = Board[i - r][j + r];

      if (piece) {
        if (piece.color === Board[i][j].color) break;
        else if (isUnderCheckIfThisMoveHappens(r)) break;
      } else if (isUnderCheckIfThisMoveHappens(r)) continue;

      if (piece === null) canMoveTo[i - r][j + r] = true;
      else {
        if (piece.color !== turn) {
          if (piece.type === "King") isGivingCheck = true;
          canMoveTo[i - r][j + r] = true;
        }
        break;
      }
    } else break;
  }

  for (let r = 1; r < 8; r++) {
    // down-right.

    const isUnderCheckIfThisMoveHappens = (r: number) => {
      let newBoard = Board.map((inner) => inner.slice());
      newBoard[i + r][j + r] = newBoard[i][j];
      newBoard[i][j] = null;
      return isUnderCheck(newBoard, turn === "W" ? "B" : "W");
    };

    if (i + r <= 7 && j + r <= 7) {
      let piece = Board[i + r][j + r];

      if (piece) {
        if (piece.color === Board[i][j].color) break;
        else if (isUnderCheckIfThisMoveHappens(r)) break;
      } else if (isUnderCheckIfThisMoveHappens(r)) continue;

      if (piece === null) canMoveTo[i + r][j + r] = true;
      else {
        if (piece.color !== turn) {
          if (piece.type === "King") isGivingCheck = true;
          canMoveTo[i + r][j + r] = true;
        }
        break;
      }
    } else break;
  }

  for (let r = 1; r < 8; r++) {
    // left bottom.

    const isUnderCheckIfThisMoveHappens = (r: number) => {
      let newBoard = Board.map((inner) => inner.slice());
      newBoard[i + r][j - r] = newBoard[i][j];
      newBoard[i][j] = null;
      return isUnderCheck(newBoard, turn === "W" ? "B" : "W");
    };

    if (i + r <= 7 && j - r >= 0) {
      let piece = Board[i + r][j - r];

      if (piece) {
        if (piece.color === Board[i][j].color) break;
        else if (isUnderCheckIfThisMoveHappens(r)) break;
      } else if (isUnderCheckIfThisMoveHappens(r)) continue;

      if (piece === null) canMoveTo[i + r][j - r] = true;
      else {
        if (piece.color !== turn) {
          if (piece.type === "King") isGivingCheck = true;
          canMoveTo[i + r][j - r] = true;
        }
        break;
      }
    }
  }

  for (let r = 1; r < 8; r++) {
    // left top.

    if (i - r >= 0 && j - r >= 0) {
      let piece = Board[i - r][j - r];

      const isUnderCheckIfThisMoveHappens = (r: number) => {
        let newBoard = Board.map((inner) => inner.slice());
        newBoard[i - r][j - r] = newBoard[i][j];
        newBoard[i][j] = null;
        return isUnderCheck(newBoard, turn === "W" ? "B" : "W");
      };

      if (piece) {
        if (piece.color === Board[i][j].color) break;
        else if (isUnderCheckIfThisMoveHappens(r)) break;
      } else if (isUnderCheckIfThisMoveHappens(r)) continue;

      if (piece === null) canMoveTo[i - r][j - r] = true;
      else {
        if (piece.color !== turn) {
          if (piece.type === "King") isGivingCheck = true;
          canMoveTo[i - r][j - r] = true;
        }
        break;
      }
    } else break;
  }

  return isGivingCheck;
};
export const King = (
  i: number,
  j: number,
  canMoveTo: boolean[][],
  Board: (Piece | any)[][],
  turn: String
) => {
  // Castling:
  let king = Board[i][j];
  let rook = Board[i][j + 3];
  if (
    // The king and rook involved in castling must not have previously moved;
    king.numOfMoves === 0 &&
    rook.numOfMoves === 0 &&
    Board[i][j + 3] &&
    Board[i][j + 3].type === "Rook" &&
    // There must be no pieces between the king and the rook;
    Board[i][j + 1] === null &&
    Board[i][j + 2] === null
  ) {
    // The king may not currently be in check, nor may the king pass through or end up in a square that is under
    // attack by an enemy piece;
    // checking whether the king would be under check if castling did happen:
    const board = Board.map((inner) => inner.slice());
    board[i][j + 1] = Board[i][j + 3];
    board[i][j + 2] = Board[i][j];
    board[i][j] = null;
    board[i][j + 3] = null;
    if (!isUnderCheck(board, turn === "W" ? "B" : "W"))
      canMoveTo[i][j + 2] = true;
  }

  if (i >= 1) {
    const piece = Board[i - 1][j];

    if (!piece || piece.color !== turn) {
      let newBoard = Board.map((inner) => inner.slice());
      newBoard[i - 1][j] = Board[i][j];
      newBoard[i][j] = null;
      if (!isUnderCheck(newBoard, turn === "W" ? "B" : "W"))
        canMoveTo[i - 1][j] = true;
    }
    if (j >= 1) {
      const piece = Board[i - 1][j - 1];

      if (!piece || piece.color !== turn) {
        let newBoard = Board.map((inner) => inner.slice());
        newBoard[i - 1][j - 1] = Board[i][j];
        newBoard[i][j] = null;
        if (!isUnderCheck(newBoard, turn === "W" ? "B" : "W"))
          canMoveTo[i - 1][j - 1] = true;
      }
    }
    if (j <= 6) {
      const piece = Board[i - 1][j + 1];

      if (!piece || piece.color !== turn) {
        let newBoard = Board.map((inner) => inner.slice());
        newBoard[i - 1][j + 1] = Board[i][j];
        newBoard[i][j] = null;
        if (!isUnderCheck(newBoard, turn === "W" ? "B" : "W"))
          canMoveTo[i - 1][j + 1] = true;
      }
    }
  }

  if (i <= 6) {
    const piece = Board[i + 1][j];

    if (!piece || piece.color !== turn) {
      let newBoard = Board.map((inner) => inner.slice());
      newBoard[i + 1][j] = Board[i][j];
      newBoard[i][j] = null;
      if (!isUnderCheck(newBoard, turn === "W" ? "B" : "W"))
        canMoveTo[i + 1][j] = true;
    }

    if (j >= 1) {
      const piece = Board[i + 1][j - 1];

      if (!piece || piece.color !== turn) {
        let newBoard = Board.map((inner) => inner.slice());
        newBoard[i + 1][j - 1] = Board[i][j];
        newBoard[i][j] = null;
        if (!isUnderCheck(newBoard, turn === "W" ? "B" : "W"))
          canMoveTo[i + 1][j - 1] = true;
      }
    }

    if (j <= 6) {
      const piece = Board[i + 1][j + 1];

      if (!piece || piece.color !== turn) {
        let newBoard = Board.map((inner) => inner.slice());
        newBoard[i + 1][j + 1] = Board[i][j];
        newBoard[i][j] = null;
        if (!isUnderCheck(newBoard, turn === "W" ? "B" : "W"))
          canMoveTo[i + 1][j + 1] = true;
      }
    }
  }

  if (j >= 1) {
    const piece = Board[i][j - 1];

    if (!piece || piece.color !== turn) {
      let newBoard = Board.map((inner) => inner.slice());
      newBoard[i][j - 1] = Board[i][j];
      newBoard[i][j] = null;
      if (!isUnderCheck(newBoard, turn === "W" ? "B" : "W"))
        canMoveTo[i][j - 1] = true;
    }
  }

  if (j <= 6) {
    const piece = Board[i][j + 1];

    if (!piece || piece.color !== turn) {
      let newBoard = Board.map((inner) => inner.slice());
      newBoard[i][j + 1] = Board[i][j];
      newBoard[i][j] = null;
      if (!isUnderCheck(newBoard, turn === "W" ? "B" : "W"))
        canMoveTo[i][j + 1] = true;
    }
  }
};
export const Pawn = (
  i: number,
  j: number,
  canMoveTo: boolean[][],
  Board: (Piece | any)[][],
  turn: String
) => {
  let isGivingCheck: boolean = false;
  Board[i][j].turnsSinceLastMove++;
  if (turn === "W") {
    if (i === 0) {
      // pawn promotion
      const pieceRef = Board[i][j];
      pieceRef.type = "Queen";
      isGivingCheck = Bishop(
        i,
        j,
        Board[i][j].canMoveTo,
        Board,
        Board[i][j].color
      );
      if (isGivingCheck)
        Rook(i, j, Board[i][j].canMoveTo, Board, Board[i][j].color);
      else
        isGivingCheck = Rook(
          i,
          j,
          Board[i][j].canMoveTo,
          Board,
          Board[i][j].color
        );
      return;
    }
    // if turn is white, pawns move up.
    if (Board[i - 1][j] === null) {
      canMoveTo[i - 1][j] = true; //Highlighting the box below the pawn.
      if (Board[i][j].numOfMoves === 0 && Board[i - 2][j] === null)
        canMoveTo[i - 2][j] = true;
    }

    if (j !== 0) {
      const upLeft = Board[i - 1][j - 1];
      const left = Board[i][j - 1];
      if (upLeft !== null) {
        if (upLeft.color === "B") {
          if (upLeft.type == "King") isGivingCheck = true;
          canMoveTo[i - 1][j - 1] = true;
        }
      } else if (
        i === 3 &&
        left &&
        left.numOfMoves === 1 &&
        left.turnsSinceLastMove === 1
      )
        canMoveTo[i - 1][j - 1] = true;
    }
    if (j !== 7) {
      const upRight = Board[i - 1][j + 1];
      const right = Board[i][j + 1];
      if (upRight !== null) {
        if (upRight.color === "B") {
          if (upRight.type == "King") isGivingCheck = true;
          canMoveTo[i - 1][j + 1] = true;
        }
      } else if (
        i === 3 &&
        right &&
        right.numOfMoves === 1 &&
        right.turnsSinceLastMove === 0
      )
        canMoveTo[i - 1][j + 1] = true;
    }
  }

  if (turn === "B") {
    if (i === 7) {
      // pawn promotion
      const pieceRef = Board[i][j];
      pieceRef.type = "Queen";
      isGivingCheck = Bishop(
        i,
        j,
        Board[i][j].canMoveTo,
        Board,
        Board[i][j].color
      );
      if (isGivingCheck)
        Rook(i, j, Board[i][j].canMoveTo, Board, Board[i][j].color);
      else
        isGivingCheck = Rook(
          i,
          j,
          Board[i][j].canMoveTo,
          Board,
          Board[i][j].color
        );
      return;
    }
    // if turn is black, pawns move below.
    if (Board[i + 1][j] === null) {
      canMoveTo[i + 1][j] = true; //Highlighting the box above the pawn.
      if (Board[i][j].numOfMoves === 0 && Board[i + 2][j] === null)
        canMoveTo[i + 2][j] = true;
    }

    if (j !== 0) {
      const upLeft = Board[i + 1][j - 1];
      const left = Board[i][j - 1];
      if (upLeft !== null) {
        if (upLeft.color === "W") {
          if (upLeft.type === "King") isGivingCheck = true;
          canMoveTo[i + 1][j - 1] = true;
        }
      } else if (
        i === 4 &&
        left &&
        left.numOfMoves === 1 &&
        left.turnsSinceLastMove === 1
      )
        canMoveTo[i + 1][j - 1] = true;
    }
    if (j !== 7) {
      const upRight = Board[i + 1][j + 1];
      const right = Board[i][j + 1];
      if (upRight !== null) {
        if (upRight.color === "W") {
          if (upRight.type == "King") isGivingCheck = true;
          canMoveTo[i + 1][j + 1] = true;
        }
      } else if (
        i === 4 &&
        right &&
        right.numOfMoves === 1 &&
        right.turnsSinceLastMove === 0
      )
        canMoveTo[i + 1][j + 1] = true;
    }
  }
  return isGivingCheck;
};

export const pieceStateUpdate = (board: (Piece | any)[][], turn: string) => {
  let piecesGivingCheck: number[][] = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let isGivingCheck: boolean | undefined = false;
      if (board[i][j] && board[i][j].color !== turn) {
        board[i][j].canMoveTo = initiallyCanMoveTo.map((inner) =>
          inner.slice()
        );
        switch (board[i][j].type) {
          case "Pawn":
            isGivingCheck = Pawn(
              i,
              j,
              board[i][j].canMoveTo,
              board,
              board[i][j].color
            );
            if (isGivingCheck) piecesGivingCheck.push([i, j]);
            break;
          case "Bishop":
            isGivingCheck = Bishop(
              i,
              j,
              board[i][j].canMoveTo,
              board,
              board[i][j].color
            );
            if (isGivingCheck) piecesGivingCheck.push([i, j]);
            break;
          case "King":
            King(i, j, board[i][j].canMoveTo, board, board[i][j].color);
            break;
          case "Queen":
            isGivingCheck = Bishop(
              i,
              j,
              board[i][j].canMoveTo,
              board,
              board[i][j].color
            );
            if (isGivingCheck) {
              piecesGivingCheck.push([i, j]);
              Rook(i, j, board[i][j].canMoveTo, board, board[i][j].color);
            } else {
              isGivingCheck = Rook(
                i,
                j,
                board[i][j].canMoveTo,
                board,
                board[i][j].color
              );
              if (isGivingCheck) piecesGivingCheck.push([i, j]);
            }
            break;
          case "Rook":
            isGivingCheck = Rook(
              i,
              j,
              board[i][j].canMoveTo,
              board,
              board[i][j].color
            );
            if (isGivingCheck) piecesGivingCheck.push([i, j]);
            break;
          case "Knight":
            isGivingCheck = Knight(
              i,
              j,
              board[i][j].canMoveTo,
              board,
              board[i][j].color
            );
            if (isGivingCheck) piecesGivingCheck.push([i, j]);
            break;
        }
      }
    }
  }
  return piecesGivingCheck;
};

const PawnGivesCheck = (i: number, j: number, Board: (Piece | any)[][]) => {
  let isGivingCheck: boolean = false;
  if (Board[i][j].color === "W") {
    if (j !== 0) {
      const upLeft = Board[i - 1][j - 1];
      if (upLeft !== null && upLeft.color === "B" && upLeft.type == "King")
        isGivingCheck = true;
    }
    if (j !== 7) {
      const upRight = Board[i - 1][j + 1];
      if (upRight !== null && upRight.color === "B" && upRight.type == "King")
        isGivingCheck = true;
    }
  }

  if (Board[i][j].color === "B") {
    if (j !== 0) {
      const upLeft = Board[i + 1][j - 1];
      if (upLeft !== null && upLeft.color === "W" && upLeft.type === "King")
        isGivingCheck = true;
    }
    if (j !== 7) {
      const upRight = Board[i + 1][j + 1];
      if (upRight !== null && upRight.color === "W" && upRight.type == "King")
        isGivingCheck = true;
    }
  }
  return isGivingCheck;
};

const RookGivesCheck = (i: number, j: number, Board: (Piece | any)[][]) => {
  if (i !== 0) {
    for (let r = i - 1; r >= 0; r--) {
      let unit = Board[r][j];
      if (
        unit &&
        (unit.color === Board[i][j].color ||
          (unit.color !== Board[i][j].color && unit.type !== "King"))
      )
        break;
      if (unit && unit.color !== Board[i][j].color && unit.type === "King")
        return true;
    }
  }
  if (i !== 7) {
    for (let r = i + 1; r <= 7; r++) {
      let unit = Board[r][j];
      if (
        unit &&
        (unit.color === Board[i][j].color ||
          (unit.color !== Board[i][j].color && unit.type !== "King"))
      )
        break;
      if (unit && unit.color !== Board[i][j].color && unit.type === "King")
        return true;
    }
  }
  if (j !== 0) {
    for (let r = j - 1; r >= 0; r--) {
      let unit = Board[i][r];
      if (
        unit &&
        (unit.color === Board[i][j].color ||
          (unit.color !== Board[i][j].color && unit.type !== "King"))
      )
        break;
      if (unit && unit.color !== Board[i][j].color && unit.type === "King")
        return true;
    }
  }
  if (j !== 7) {
    for (let r = j + 1; r <= 7; r++) {
      let unit = Board[i][r];
      if (
        unit &&
        (unit.color === Board[i][j].color ||
          (unit.color !== Board[i][j].color && unit.type !== "King"))
      )
        break;
      if (unit && unit.color !== Board[i][j].color && unit.type === "King")
        return true;
    }
  }
  return false;
};

const KnightGivesCheck = (i: number, j: number, Board: (Piece | any)[][]) => {
  if (i >= 2) {
    // i has to be greater than 1 if the knight has to move ahead. because it moves 2 straight
    // and 1 in the other axis.
    if (j >= 1) {
      let left = Board[i - 2][j - 1];

      if (left && left.color !== Board[i][j].color && left.type === "King")
        return true;
    }
    if (j <= 6) {
      let right = Board[i - 2][j + 1];

      if (right && right.color !== Board[i][j].color && right.type === "King")
        return true;
    }
  }
  // This covers the 2 cases:
  // Knight moving 2 straight down and 1 left,
  // Knight moving 2 straight down and 1 right,
  if (i <= 5) {
    // i has to be less than 6 if the knight has to move below. because it moves 2 straight
    // and 1 in the other axis.
    if (j >= 1) {
      let left = Board[i + 2][j - 1];

      if (left && left.color !== Board[i][j].color && left.type === "King")
        return true;
    }
    if (j <= 6) {
      let right = Board[i + 2][j + 1];

      if (right && right.color !== Board[i][j].color && right.type === "King")
        return true;
    }
  }

  // This covers the 2 cases:
  // Knight moving 2 left and 1 up,
  // Knight moving 2 left and 1 down,
  if (j >= 2) {
    //i has to be greater than 1 if the knight has to move ahead. because it moves 2 straight
    // and 1 in the other axis.
    if (i >= 1) {
      let left = Board[i - 1][j - 2];

      if (left && left.color !== Board[i][j].color && left.type === "King")
        return true;
    }
    if (i <= 6) {
      let right = Board[i + 1][j - 2];

      if (right && right.color !== Board[i][j].color && right.type === "King")
        return true;
    }
  }

  if (j <= 5) {
    //i has to be less than 6 if the knight has to move below. because it moves 2 straight
    // and 1 in the other axis.
    if (i >= 1) {
      let left = Board[i - 1][j + 2];

      if (left && left.color !== Board[i][j].color && left.type === "King")
        return true;
    }
    if (i <= 6) {
      let right = Board[i + 1][j + 2];

      if (right && right.color !== Board[i][j].color && right.type === "King")
        return true;
    }
  }
  return false;
};

const BishopGivesCheck = (i: number, j: number, Board: (Piece | any)[][]) => {
  //bishop can move in 4 directions.
  for (let r = 1; r < 8; r++) {
    // up-right.
    if (i - r >= 0 && j + r <= 7) {
      const piece = Board[i - r][j + r];
      if (
        piece &&
        (piece.color === Board[i][j].color ||
          (piece.color !== Board[i][j].color && piece.type !== "King"))
      )
        break;
      if (piece && piece.color !== Board[i][j].color && piece.type === "King")
        return true;
    } else break;
  }

  for (let r = 1; r < 8; r++) {
    // down-right.
    if (i + r <= 7 && j + r <= 7) {
      let piece = Board[i + r][j + r];
      if (
        piece &&
        (piece.color === Board[i][j].color ||
          (piece.color !== Board[i][j].color && piece.type !== "King"))
      )
        break;
      if (piece && piece.color !== Board[i][j].color && piece.type === "King")
        return true;
    } else break;
  }

  for (let r = 1; r < 8; r++) {
    // left bottom.
    if (i + r <= 7 && j - r >= 0) {
      let piece = Board[i + r][j - r];
      if (
        piece &&
        (piece.color === Board[i][j].color ||
          (piece.color !== Board[i][j].color && piece.type !== "King"))
      )
        break;
      if (piece && piece.color !== Board[i][j].color && piece.type === "King")
        return true;
    }
  }

  for (let r = 1; r < 8; r++) {
    // left top.
    if (i - r >= 0 && j - r >= 0) {
      let piece = Board[i - r][j - r];
      if (
        piece &&
        (piece.color === Board[i][j].color ||
          (piece.color !== Board[i][j].color && piece.type !== "King"))
      )
        break;
      if (piece && piece.color !== Board[i][j].color && piece.type === "King")
        return true;
    } else break;
  }

  return false;
};

const KingGivesCheck = (i: number, j: number, Board: (Piece | any)[][]) => {
  if (i >= 1) {
    const piece = Board[i - 1][j];
    if (piece && piece.color !== Board[i][j].color && piece.type === "King")
      return true;

    if (j >= 1) {
      const piece = Board[i - 1][j - 1];
      if (piece && piece.color !== Board[i][j].color && piece.type === "King")
        return true;
    }
    if (j <= 6) {
      const piece = Board[i - 1][j + 1];
      if (piece && piece.color !== Board[i][j].color && piece.type === "King")
        return true;
    }
  }

  if (i <= 6) {
    const piece = Board[i + 1][j];
    if (piece && piece.color !== Board[i][j].color && piece.type === "King")
      return true;

    if (j >= 1) {
      const piece = Board[i + 1][j - 1];
      if (piece && piece.color !== Board[i][j].color && piece.type === "King")
        return true;
    }
    if (j <= 6) {
      const piece = Board[i + 1][j + 1];
      if (piece && piece.color !== Board[i][j].color && piece.type === "King")
        return true;
    }
  }

  if (j >= 1) {
    const piece = Board[i][j - 1];
    if (piece && piece.color !== Board[i][j].color && piece.type === "King")
      return true;
  }

  if (j <= 6) {
    const piece = Board[i][j + 1];
    if (piece && piece.color !== Board[i][j].color && piece.type === "King")
      return true;
  }

  return false;
};

// checkForWhom will be opposite color of the piece that called this function.
const isUnderCheck = (board: (Piece | any)[][], checkForWhom: String) => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j] && board[i][j].color === checkForWhom) {
        let isGivingCheck: boolean | undefined = false;
        switch (board[i][j].type) {
          // case "Pawn":
          //   isGivingCheck = PawnGivesCheck(i, j, board);
          //   break;
          case "Bishop":
            isGivingCheck = BishopGivesCheck(i, j, board);
            break;
          case "King":
            isGivingCheck = KingGivesCheck(i, j, board);
            break;
          case "Queen":
            isGivingCheck = BishopGivesCheck(i, j, board);
            if (!isGivingCheck) isGivingCheck = RookGivesCheck(i, j, board);
            break;
          case "Rook":
            isGivingCheck = RookGivesCheck(i, j, board);
            break;
          case "Knight":
            isGivingCheck = KnightGivesCheck(i, j, board);
            break;
        }
        if (isGivingCheck) return true;
      }
    }
  }
  return false;
};
