import React from "react";
import { Piece } from "../game/Piece";

interface Props {
  rows: any;
  k: number;
  i: number;
  piece: Piece | null;
  setBoard: React.Dispatch<React.SetStateAction<(Piece | null)[][]>>;
}

const Square: React.FC<Props> = props => {
  let background = "black";
  let color = "white";
  if ((props.i + props.k) % 2 == 0) {
    background = "white";
    color = "black";
  }
  const handleClick = () => {
    if (props.piece == null) {
      console.log("This is null");
      return;
    }

    console.log(props.piece.type);
  };
  return (
    <div
      onClick={handleClick}
      style={{
        display: "flex",
        width: 100,
        height: 100,
        backgroundColor: background,
        color: color
      }}
    >
      {props.rows[props.k] && (
        <img
          src={`./gfx/${props.rows[props.k].color}${
            props.rows[props.k].type
          }.png`}
          alt="b bishop"
          style={{ margin: "auto" }}
        />
      )}
    </div>
  );
};

export default Square;
