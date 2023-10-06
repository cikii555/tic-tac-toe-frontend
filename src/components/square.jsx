import React from "react";
import Symbol from "./symbol";

const Square = (props) => {
  console.log(props);
  return (
    <button className="square" onClick={props.handleClick}>
      {props.value}
    </button>
  );
};

export default Square;
