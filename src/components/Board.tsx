import React, { useState } from "react";
import { Piece } from "../game/Piece";
import Square from "../components/Square";
import { initialBoard, initiallyCanMoveTo } from "../game/InitialPositions";
import { Pawn } from "../game/pieceLogic";
//Queen, Bishop, Knight, Rook, King

const Board: React.FC = () => {
  const [board, setBoard] = useState(() => initialBoard);
  const [previousClick, setPreviousClick] = useState();
  const [turn, setTurn] = useState("W");
  const [canMoveTo, setCanMoveTo] = useState(() => [...initiallyCanMoveTo]);

  const checkMoveViability = (canMoveTo: boolean[][], i: number, k: number) => {
    canMoveTo = initiallyCanMoveTo.map(inner => inner.slice());
    //check viability
    switch (board[i][k].type) {
      case "Rook":
        // code block
        break;
      case "Bishop":
        // code block
        break;
      case "Knight":
        // code block
        break;
      case "Queen":
        // code block
        break;
      case "Pawn":
        Pawn(i, k, canMoveTo, board, turn);
        // code block
        break;
      case "King":
        // code block
        break;

      default:
      // code block
    }

    canMoveTo[i][k] = true;
    return [...canMoveTo];
  };

  const updateBoard = (
    previousBoard: (Piece | any)[][],
    i: number,
    k: number
  ) => {
    let newBoard = previousBoard.map(inner => inner.slice());
    newBoard[previousClick[0]][previousClick[1]] = null;
    newBoard[i][k] = previousBoard[previousClick[0]][previousClick[1]];
    return newBoard;
  };

  const handleClick = (i: number, k: number) => {
    if (canMoveTo[i][k] == true) {
      setBoard(previousBoard => updateBoard(previousBoard, i, k));
      setCanMoveTo(initiallyCanMoveTo.map(inner => inner.slice()));
    } else {
      setCanMoveTo(canMoveTo => checkMoveViability(canMoveTo, i, k));
      setPreviousClick([i, k]);
    }
  };

  return (
    <section className="app_board">
      {board.map((rows: Piece[][] | any, i: number) => {
        return rows.map((col: Piece[], k: number) => {
          return (
            <Square
              rows={rows}
              k={k}
              i={i}
              piece={board[i][k]}
              handleClick={handleClick}
              active={canMoveTo[i][k]}
            />
          );
        });
      })}
    </section>
  );
};

export default Board;
