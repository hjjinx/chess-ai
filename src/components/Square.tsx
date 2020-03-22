import React, { useState } from "react";
import { Piece } from "../game/Piece";

interface Props {
  rows: any;
  k: number;
  i: number;
  piece: Piece | null;
  handleClick: (i: number, k: number) => void;
  active: boolean;
}

const Square: React.FC<Props> = props => {
  let background = "black";
  let color = "white";

  if ((props.i + props.k) % 2 == 0) {
    background = "white";
    color = "black";
  }
  const handleClick = () => {
    if (props.piece == null && !props.active) {
      console.log("This is null");
      return;
    }
    props.handleClick(props.i, props.k);
  };
  return (
    <div
      onClick={handleClick}
      style={{
        display: "flex",
        width: 100,
        height: 100,
        backgroundColor: background,
        color: color,
        border: `1px solid ${props.active ? "yellow" : "black"}`
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
