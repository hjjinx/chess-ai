import { Piece } from "./Piece";
import { pieceStateUpdate } from "./pieceLogic";

/*
Max:      O
        /   \
Min    O     O
      / \   / \
Max: O   O O   O
*/

export default (board: (Piece | any)[][]) => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (!board[i][j]) continue;
      for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
          // board[i][j].canMoveTo[x][y]
        }
      }
    }
  }
};
