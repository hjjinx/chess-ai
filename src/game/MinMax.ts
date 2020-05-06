import { Piece } from "./Piece";
import {
  Pawn,
  Bishop,
  King,
  Rook,
  Knight,
  pieceStateUpdate,
} from "./pieceLogic";

/*
Max:      O
        /   \
Min    O     O * 10
      / \   / \
Max: O   O O   O * 200
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
  iterationsLeft: number,
  totalIterations: number
): { score: number; moveToMake: fromTo } => {
  // If this move is the bottom-most move in the MinMax search tree
  if (iterationsLeft === 0) {
    // let currentScore = analyseBoard(board);
    // console.log(currentScore, iterationsLeft, board);
    return {
      score: analyseBoard(board),
      moveToMake: new fromTo(1, 1, 1, 1),
    };
  }
  // analyseBoard(board);
  pieceStateUpdate(board, turn === "W" ? "B" : "W");
  console.log(board);

  let scoresAndMoves: any = {};
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      // board[i][j] represents each piece.
      if (!board[i][j] || board[i][j].color !== turn) continue;
      // Create a copy of the piece because piece.canMoveTo will change.
      let piece = Object.assign({}, board[i][j]);
      for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
          // board[i][j].canMoveTo[x][y] represents each possible move by board[i][j].
          // Check board[i][j].canMoveTo[x][y], play that move, analyse and save the new score
          if (piece.canMoveTo[x][y]) {
            console.log(i, j, piece.type, piece.canMoveTo);
            // console.log(i, j, x, y, board[i][j].canMoveTo);
            // let newBoard = board.map((inner) => inner.slice());
            let newBoard = board.map((inner) => inner.slice());
            newBoard[x][y] = board[i][j];
            newBoard[i][j] = null;

            // Call MinMax again recursively on the new state of the Board.
            pieceStateUpdate(newBoard, turn === "W" ? "B" : "W");
            let { score: scoreToSend, moveToMake } = MinMax(
              newBoard,
              turn === "W" ? "B" : "W",
              iterationsLeft - 1,
              totalIterations
            );

            let thisMove = new fromTo(i, j, x, y);

            scoresAndMoves[scoreToSend] = thisMove;

            // if (
            //   turn === "W"
            //     ? scoreAfterThisMove > bestFutureMove.newScore
            //     : scoreAfterThisMove < bestFutureMove.newScore
            // )
            //   bestFutureMove = {
            //     newScore: scoreAfterThisMove,
            //     newBestMove: thisMove,
            //     newBoard,
            //   };
          }
        }
      }
    }
  }
  console.log(board);
  console.log(scoresAndMoves);
  let scoreToSend = 0;
  if (turn === "W") {
    scoreToSend = -10000;
    for (let score in scoresAndMoves) {
      let intScore = parseInt(score);
      if (intScore > scoreToSend) scoreToSend = intScore;
    }
  } else {
    scoreToSend = 10000;
    for (let score in scoresAndMoves) {
      let intScore = parseInt(score);
      if (intScore < scoreToSend) scoreToSend = intScore;
    }
  }

  return { score: scoreToSend, moveToMake: scoresAndMoves[scoreToSend] };

  // return { scoreToSend: 0, moveToMake: new fromTo(1, 1, 2, 1) };

  // let { newScore, newBestMove } = MinMax(
  //   bestFutureMove.newBoard,
  //   turn === "W" ? "B" : "W",
  //   turn === "W" ? -10000 : 10000,
  //   new fromTo(1, 2, 1, 1),
  //   iterationsLeft - 1
  // );
  // if (turn === "W" ? newScore > bestScore : newScore < bestScore)
  //   return { newScore, newBestMove: thisMove };
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
      // console.log(valueOfBoard);
    }
  }
  // console.log(board);
  return valueOfBoard;
};
