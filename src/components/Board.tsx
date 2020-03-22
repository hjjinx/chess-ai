import React, { useState } from "react";
import { Piece } from "../game/Piece";
import Square from "../components/Square";
import { initialBoard, initiallyCanMoveTo } from "../game/InitialPosition";
import { pieceStateUpdate } from "../game/pieceLogic";

pieceStateUpdate(initialBoard);

const Board: React.FC = () => {
  const [board, setBoard] = useState(() => initialBoard);
  const [previousClick, setPreviousClick] = useState([4, 4]);
  const [turn, setTurn] = useState("W");
  const [isCheckMate, setIsCheckMate] = useState(false);
  const [canMoveToHighlighted, setCanMoveToHighlighted] = useState(() => [
    ...initiallyCanMoveTo
  ]);

  const updateBoard = (
    previousBoard: (Piece | any)[][],
    i: number,
    k: number
  ) => {
    let newBoard = previousBoard.map(inner => inner.slice());
    newBoard[previousClick[0]][previousClick[1]] = null;
    if (newBoard[i][k] && newBoard[i][k].type === "King") {
      alert("Game over");
    }
    newBoard[i][k] = previousBoard[previousClick[0]][previousClick[1]];

    // An array of (isUnderCheck = [[i, k,], [i, k]]) piece locations that are contributing to the check right now.
    const isUnderCheck = pieceStateUpdate(newBoard);
    return newBoard;
  };

  const handleClick = (i: number, k: number) => {
    if (
      board[i][k] &&
      turn !== board[i][k].color &&
      !canMoveToHighlighted[i][k]
    )
      return;
    if (i === previousClick[0] && k === previousClick[1]) return;

    if (canMoveToHighlighted[i][k] == true) {
      // If can move to i, k; then move here
      setBoard(previousBoard => updateBoard(previousBoard, i, k));
      setCanMoveToHighlighted(initiallyCanMoveTo.map(inner => inner.slice()));
      turn === "W" ? setTurn("B") : setTurn("W");
    } else {
      setCanMoveToHighlighted(canMoveTo =>
        board[i][k].canMoveTo.map((inner: any): boolean[] => inner.slice())
      );
      setPreviousClick([i, k]);
    }
  };

  return (
    <section className="app_board" style={{ margin: "auto" }}>
      {board.map((rows: Piece[][] | any, i: number) => {
        return rows.map((col: Piece[], k: number) => {
          return (
            <Square
              rows={rows}
              k={k}
              i={i}
              piece={board[i][k]}
              handleClick={handleClick}
              active={canMoveToHighlighted[i][k]}
            />
          );
        });
      })}
    </section>
  );
};

export default Board;
