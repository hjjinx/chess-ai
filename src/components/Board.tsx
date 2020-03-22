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

const Board: React.FC = () => {
  const [board, setBoard] = useState(() => initialBoard);

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
              setBoard={setBoard}
            />
          );
        });
      })}
    </section>
  );
};

export default Board;
