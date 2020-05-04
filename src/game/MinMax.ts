import { Piece } from "./Piece";
import { Pawn, Bishop, King, Rook, Knight } from "./pieceLogic";

/*
Max:      O
        /   \
Min    O     O
      / \   / \
Max: O   O O   O
*/

export class fromTo {
  constructor(
    i: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | number,
    j: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | number,
    x: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | number,
    y: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | number
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

const MinMax = (
  board: (Piece | any)[][],
  turn: "W" | "B",
  bestScore: number,
  bestMove: fromTo,
  iterationsLeft: number
): { newScore: number; newBestMove: fromTo } => {
  let currentScore = analyseBoard(board);
  if (iterationsLeft === 0)
    return { newScore: currentScore, newBestMove: bestMove };
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (!board[i][j] || board[i][j].color !== turn) continue;
      for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
          let piece = board[i][j];
          // Check board[i][j].canMoveTo[x][y], play that move, analyse and save the new score
          if (piece.canMoveTo[x][y]) {
            let newBoard = board.map((inner) => inner.slice());
            newBoard[x][y] = board[i][j];
            newBoard[i][j] = null;
            // Call MinMax again recursively on the new state of the Board.
            let thisMove = new fromTo(i, j, x, y);
            let { newScore, newBestMove } = MinMax(
              newBoard,
              turn === "W" ? "B" : "W",
              currentScore,
              thisMove,
              iterationsLeft - 1
            );
            if (turn === "W" ? newScore > bestScore : newScore < bestScore)
              return { newScore, newBestMove: thisMove };
          }
        }
      }
    }
  }
  return { newScore: bestScore, newBestMove: bestMove };
};

export default MinMax;

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
