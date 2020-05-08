import { Piece } from "./Piece";
import { pieceStateUpdate } from "./pieceLogic";
import {
  PawnScore,
  RookScore,
  BishopScore,
  KingScore,
  KnightScore,
} from "./AnalysePosition";

/*
Min (B):      O
            /   \
Max (W)    O     O * 10
          / \   / \
Min: (B) O   O O   O * 200
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
  alpha: number,
  beta: number
): { score: number; moveToMake: fromTo } => {
  // If this move is the bottom-most move in the MinMax search tree
  if (iterationsLeft === 0)
    return {
      score: analyseBoard(board),
      moveToMake: new fromTo(1, 1, 1, 1),
    };
  let scoresAndMoves: any = {};

  const returnValue = () => {
    console.log("RETURNING:");
    console.log(board);
    let scoreToSend = 0;
    if (turn === "W") {
      scoreToSend = -100000;
      for (let score in scoresAndMoves) {
        let intScore = parseInt(score);
        if (intScore > scoreToSend) scoreToSend = intScore;
      }
    } else {
      scoreToSend = 100000;
      for (let score in scoresAndMoves) {
        let intScore = parseInt(score);
        if (intScore < scoreToSend) scoreToSend = intScore;
      }
    }
    console.log(scoresAndMoves);
    console.log(
      "Best Move: ",
      turn,
      iterationsLeft,
      scoreToSend,
      scoresAndMoves[scoreToSend]
    );
    console.log("\n\n\n");
    if (Object.keys(scoresAndMoves).length === 0)
      return { score: -scoreToSend, moveToMake: new fromTo(-1, -1, -1, -1) };
    return { score: scoreToSend, moveToMake: scoresAndMoves[scoreToSend] };
  };

  // Create a copy of the piece because piece.canMoveTo will change.
  let newBoard = JSON.parse(JSON.stringify(board));
  pieceStateUpdate(newBoard, turn);

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let count = 0;
      // board[i][j] represents each piece.
      if (!newBoard[i][j] || newBoard[i][j].color !== turn) continue;
      for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
          let piece = newBoard[i][j];
          // board[i][j].canMoveTo[x][y] represents each possible move by board[i][j].
          // Check board[i][j].canMoveTo[x][y], play that move, analyse and save the new score
          if (piece.canMoveTo[x][y]) {
            count++;
            // console.log(i, j, x, y, board[i][j].canMoveTo);
            let newBoard = board.map((inner) => inner.slice());
            newBoard[x][y] = newBoard[i][j];
            newBoard[i][j] = null;

            // Call MinMax again recursively on the new state of the Board.
            // pieceStateUpdate(newBoard, turn === "W" ? "B" : "W");
            let { score: scoreToSend, moveToMake } = MinMax(
              newBoard,
              turn === "W" ? "B" : "W",
              iterationsLeft - 1,
              alpha,
              beta
            );
            let thisMove = new fromTo(i, j, x, y);

            scoresAndMoves[scoreToSend] = thisMove;

            if (turn === "W" && scoreToSend !== 100000) {
              alpha = Math.max(alpha, scoreToSend, -100000);
            } else if (scoreToSend !== -100000) {
              beta = Math.min(beta, scoreToSend, 100000);
            }

            if (beta <= alpha) {
              console.log("Broke out after " + count + " iterations");
              return returnValue();
            }

            // Alpha-Beta Pruning
            // Alpha is high, Beta is low
            // Beta: The value returned is the maximum in the sub-tree
            // Alpha represents the minimum best value. Beta represents the maximum best value
          }
        }
      }
    }
  }

  return returnValue();
};

export default MinMax;

const analyseBoard = (board: (Piece | any)[][]) => {
  let valueOfBoard: number = 0;
  // board = JSON.parse(JSON.stringify(board));
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j]) {
        switch (board[i][j].type) {
          case "Pawn":
            PawnScore(i, j, board);
            break;
          case "Bishop":
            BishopScore(i, j, board);
            break;
          case "King":
            KingScore(i, j, board);
            break;
          case "Queen":
            BishopScore(i, j, board);
            RookScore(i, j, board);
            break;
          case "Rook":
            RookScore(i, j, board);
            break;
          case "Knight":
            KnightScore(i, j, board);
            break;
        }
        valueOfBoard += board[i][j].importance;
      }
    }
  }
  return valueOfBoard;
};
