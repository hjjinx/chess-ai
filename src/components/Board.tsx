import React, { useState } from "react";
import { Piece } from "../game/Piece";
import Square from "../components/Square";

let initialBoard: (Piece | null)[][] = [
  [
    new Piece("Rook", "B"),
    new Piece("Knight", "B"),
    new Piece("Bishop", "B"),
    new Piece("Queen", "B"),
    new Piece("King", "B"),
    new Piece("Bishop", "B"),
    new Piece("Knight", "B"),
    new Piece("Rook", "B")
  ],
  [
    new Piece("Pawn", "B"),
    new Piece("Pawn", "B"),
    new Piece("Pawn", "B"),
    new Piece("Pawn", "B"),
    new Piece("Pawn", "B"),
    new Piece("Pawn", "B"),
    new Piece("Pawn", "B"),
    new Piece("Pawn", "B")
  ],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [
    new Piece("Pawn", "W"),
    new Piece("Pawn", "W"),
    new Piece("Pawn", "W"),
    new Piece("Pawn", "W"),
    new Piece("Pawn", "W"),
    new Piece("Pawn", "W"),
    new Piece("Pawn", "W"),
    new Piece("Pawn", "W")
  ],
  [
    new Piece("Rook", "W"),
    new Piece("Knight", "W"),
    new Piece("Bishop", "W"),
    new Piece("Queen", "W"),
    new Piece("King", "W"),
    new Piece("Bishop", "W"),
    new Piece("Knight", "W"),
    new Piece("Rook", "W")
  ]
];

const initiallyCanMoveTo: boolean[][] = [
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false]
];

const Board: React.FC = () => {
  const [board, setBoard] = useState(() => initialBoard);

  const [canMoveTo, setCanMoveTo] = useState(() => [...initiallyCanMoveTo]);

  let previousClick: number[] = [];
  const handleClick = (i: number, k: number) => {
    setCanMoveTo(canMoveTo => {
      canMoveTo = initiallyCanMoveTo.map(inner => inner.slice());
      canMoveTo[i][k] = true;
      return [...canMoveTo];
    });
    previousClick = [i, k];
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
