import React, { useState } from "react";
import Board from "./game/Board";
import "./App.css";
import { Piece } from "./game/Piece";
import Square from "./components/Square";

const App: React.FC = () => {
  const [board, setBoard] = useState(() => new Board());
  console.log("board");
  return (
    <main className="app">
      <h1>Chess Ai</h1>

      <section className="app_board">
        {board.state.map((rows: Piece[][] | any, i: number) => {
          return rows.map((col: Piece[], k: number) => {
            return <Square rows={rows} k={k} i={i} />;
          });
        })}
      </section>
    </main>
  );
};

export default App;
