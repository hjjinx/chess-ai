import React, { useState } from "react";
import Board from "./components/Board";
import "./App.css";
// import { Piece } from "./game/Piece";

const App: React.FC = () => {
  // board.move([], [])
  console.log("board");
  return (
    <main className="app">
      <h1>Chess Ai</h1>
      <Board />
    </main>
  );
};

export default App;
