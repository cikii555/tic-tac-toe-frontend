import React from "react";
import X from "./X";
import O from "./O";
const Symbol = (props) => {
  console.log(props);
  switch (props.symbol) {
    case "X":
      return <X />;
    case "O":
      return <O />;

    default:
      return <div></div>;
  }
};

export default Symbol;
