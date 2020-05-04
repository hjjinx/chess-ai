import { Piece } from "./Piece";
import { Pawn, Bishop, King, Rook, Knight } from "./pieceLogic";

/*
Max:      O
        /   \
Min    O     O
      / \   / \
Max: O   O O   O
*/

class fromTo {
  constructor(
    i: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7,
    j: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7,
    x: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7,
    y: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  ) {
    this.i = i;
    this.j = j;
    this.x = x;
    this.y = y;
  }
  // i, j represent move from.
  i: number;
  j: number;
  // x, y represent moved to.
  x: number;
  y: number;
}

export default (board: (Piece | any)[][]) => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (!board[i][j]) continue;
      for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
          // Check board[i][j].canMoveTo[x][y], play that move, analyse and save the new score
          // board[i][j].canMoveTo[x][y]
        }
      }
    }
  }
};

const analyseBoard = (board: (Piece | any)[][]) => {
  let valueOfBoard: number = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j]) {
        switch (board[i][j].type) {
          case "Pawn":
            Pawn(i, j, board[i][j].canMoveTo, board, board[i][j].color);
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
        valueOfBoard += board[i][j].importance;
      }
      console.log(valueOfBoard);
    }
  }
  return valueOfBoard;
};
