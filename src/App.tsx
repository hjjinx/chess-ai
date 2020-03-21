import React, { useState } from "react";
import Board from "./game/Board";
import "./App.css";
import { Piece } from "./game/Piece";
import bbishop from "./gfx/BBishop.png";

const App: React.FC = () => {
  const [board, setBoard] = useState(() => new Board());
  console.log("board");
  return (
    <div>
      <h1>Chess Ai</h1>

      {/* <pre>{JSON.stringify(board, null, 2)}</pre> */}
      <div
        style={{
          width: "800px",
          display: "grid",
          gridTemplateColumns: `repeat(8, 100px)`,
          border: "1px solid black"
        }}
      >
        {board.state.map((rows: Piece[][] | any, i: number) => {
          return rows.map((col: Piece[], k: number) => {
            let background = "black";
            let color = "white";
            if ((i + k) % 2 == 0) {
              background = "white";
              color = "black";
            }
            return (
              <div
                style={{
                  display: "flex",
                  width: 100,
                  height: 100,
                  backgroundColor: background,
                  color
                }}
              >
                <img src={bbishop} alt="b bishop" style={{ margin: "auto" }} />
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};

export default App;
