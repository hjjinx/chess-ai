import React, { useState } from "react";
import { Piece } from "../game/Piece";
import Square from "../components/Square";
import { initialBoard, initiallyCanMoveTo } from "../game/InitialPosition";
import { pieceStateUpdate } from "../game/pieceLogic";

pieceStateUpdate(initialBoard, "B");

const Board: React.FC = () => {
  const [board, setBoard] = useState(() => initialBoard);
  const [previousClick, setPreviousClick] = useState([4, 4]);
  const [turn, setTurn] = useState("W");
  const [canMoveToHighlighted, setCanMoveToHighlighted] = useState(() => [
    ...initiallyCanMoveTo,
  ]);
  const clickNothing = () => {
    setCanMoveToHighlighted(initiallyCanMoveTo.map((inner) => inner.slice()));
    setPreviousClick([9, 9]);
  };

  const movePiece = (
    previousBoard: (Piece | any)[][],
    i: number,
    k: number
  ) => {
    // Create a copy of the previous board
    let newBoard = previousBoard.map((inner) => inner.slice());
    if (newBoard[i][k] && newBoard[i][k].type === "King") {
      // Game over here
      alert("Game over");
    }

    // Check for Castling:
    if (
      k === 6 &&
      (i === 0 || i === 7) &&
      previousClick[1] === 4 &&
      (previousClick[0] === 0 || previousClick[0] === 7) &&
      previousBoard[previousClick[0]][previousClick[1]].type === "King"
    ) {
      newBoard[i][k - 1] = previousBoard[previousClick[0]][7];
      newBoard[i][7] = null;
      newBoard[i][k - 1].numOfMoves++;
    }

    // Check for En Passant:
    if (
      (i === 2 &&
        previousBoard[i + 1][k] &&
        previousBoard[i + 1][k].type === "Pawn" &&
        previousBoard[previousClick[0]][previousClick[1]].type === "Pawn") ||
      (i === 5 &&
        previousBoard[i - 1][k] &&
        previousBoard[i - 1][k].type === "Pawn" &&
        previousBoard[previousClick[0]][previousClick[1]].type === "Pawn")
    )
      newBoard[i === 2 ? 3 : 4][k] = null;

    // Pawn Promotion
    if (
      (i === 0 &&
        previousBoard[1][k] &&
        previousBoard[1][k].color === "W" &&
        previousBoard[1][k].type === "Pawn") ||
      (i === 7 &&
        previousBoard[6][k] &&
        previousBoard[6][k].color === "B" &&
        previousBoard[6][k].type === "Pawn")
    )
      previousBoard[i === 0 ? 1 : 6][k].type = "Queen";

    newBoard[i][k] = previousBoard[previousClick[0]][previousClick[1]];
    newBoard[previousClick[0]][previousClick[1]] = null;
    newBoard[i][k].numOfMoves++;
    newBoard[i][k].turnsSinceLastMove = 0;

    // (piecesGivingCheck = [[i, k,], [i, k]]) piece locations that can directly kill the King in the next turn
    pieceStateUpdate(newBoard, turn);

    return newBoard;
  };

  const handleClick = (i: number, k: number) => {
    // If it's W's turn and they click B's Piece
    if (
      board[i][k] &&
      turn !== board[i][k].color &&
      !canMoveToHighlighted[i][k]
    )
      return;

    // If clicking on the same box that the user previously clicked
    if (i === previousClick[0] && k === previousClick[1]) return;

    // If the Piece that the user previously clicked on can move to [i, k]
    if (canMoveToHighlighted[i][k] == true) {
      setBoard((previousBoard) => movePiece(previousBoard, i, k));
      setCanMoveToHighlighted(initiallyCanMoveTo.map((inner) => inner.slice()));
      turn === "W" ? setTurn("B") : setTurn("W");
    } else {
      setCanMoveToHighlighted((canMoveTo) => {
        let newCanMoveTo = board[i][k].canMoveTo.map((inner: any): boolean[] =>
          inner.slice()
        );
        newCanMoveTo[i][k] = true;
        return newCanMoveTo;
      });

      setPreviousClick([i, k]);
    }
  };

  return (
    <div>
      <section className="app_board" style={{ margin: "auto" }}>
        {board.map((rows: Piece[][] | any, i: number) => {
          return rows.map((col: Piece[], k: number) => {
            return (
              <Square
                clickNothing={clickNothing}
                rows={rows}
                k={k}
                i={i}
                key={`${i}_${k}`}
                piece={board[i][k]}
                handleClick={handleClick}
                active={canMoveToHighlighted[i][k]}
              />
            );
          });
        })}
      </section>
    </div>
  );
};

export default Board;
