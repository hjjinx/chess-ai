import React, { useState } from "react";
import { Piece } from "../game/Piece";

interface Props {
  rows: any;
  k: number;
  i: number;
  piece: Piece | null;
  handleClick: (i: number, k: number) => void;
  clickNothing: () => void;
  active: boolean;
}

const Square: React.FC<Props> = (props) => {
  let background = "rgb(208, 139, 76)";
  let color = "white";

  if ((props.i + props.k) % 2 == 0) {
    background = "rgb(254, 206, 161)";
    color = "black";
  }
  const handleClick = () => {
    if (props.piece == null && !props.active) props.clickNothing();
    else props.handleClick(props.i, props.k);
  };
  return (
    <div
      onClick={handleClick}
      style={{
        display: "flex",
        width: 100,
        height: 100,
        backgroundColor: background,
        boxShadow: `0 0 40px 1px ${
          props.active ? (props.piece ? "red" : "yellow") : "transparent"
        } inset`,
        color,
        border: `1px solid black  `,
        boxSizing: "border-box",
      }}
    >
      {props.rows[props.k] && (
        <img
          src={`./gfx/${props.rows[props.k].color}${
            props.rows[props.k].type
          }.png`}
          alt="b bishop"
          style={{ margin: "auto", height: "80%" }}
        />
      )}
    </div>
  );
};

export default Square;
