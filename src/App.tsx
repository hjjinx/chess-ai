import React from "react";
import Board from "./components/Board";
import "./App.css";
// import { Piece } from "./game/Piece";

const App: React.FC = () => {
  return (
    <main className="app">
      <Board />
    </main>
  );
};

export default App;
