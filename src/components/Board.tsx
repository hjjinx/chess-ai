import React, { useState } from "react";
import { Piece } from "../game/Piece";
import Square from "../components/Square";
import { initialBoard, initiallyCanMoveTo } from "../game/InitialPositions";
import { Pawn, Rook, Knight, Bishop, King } from "../game/pieceLogic";

const Board: React.FC = () => {
  const [board, setBoard] = useState(() => initialBoard);
  const [previousClick, setPreviousClick] = useState([4, 4]);
  const [turn, setTurn] = useState("W");
  const [canMoveTo, setCanMoveTo] = useState(() => [...initiallyCanMoveTo]);

  const checkMoveViability = (canMoveTo: boolean[][], i: number, k: number) => {
    canMoveTo = initiallyCanMoveTo.map(inner => inner.slice());
    //check viability
    switch (board[i][k].type) {
      case "Rook":
        Rook(i, k, canMoveTo, board, turn);
        break;
      case "Bishop":
        Bishop(i, k, canMoveTo, board, turn);
        break;
      case "Knight":
        Knight(i, k, canMoveTo, board, turn);
        break;
      case "Queen":
        Rook(i, k, canMoveTo, board, turn);
        Bishop(i, k, canMoveTo, board, turn);
        break;
      case "Pawn":
        Pawn(i, k, canMoveTo, board, turn);
        break;
      case "King":
        King(i, k, canMoveTo, board, turn);
        break;
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
    if (board[i][k] && turn !== board[i][k].color) return;
    if (i === previousClick[0] && k === previousClick[1]) return;

    if (canMoveTo[i][k] == true) {
      setBoard(previousBoard => updateBoard(previousBoard, i, k));
      setCanMoveTo(initiallyCanMoveTo.map(inner => inner.slice()));
      turn === "W" ? setTurn("B") : setTurn("W");
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
