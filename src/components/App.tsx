import { px } from "csx";
import React, { useEffect, useRef } from "react";
import { style } from "typestyle";
import { FONTS, PALETTE } from "../styles";


const AppStyle = style({
  textAlign: "center",
  $nest: {
    h1: {
      fontFamily: FONTS.AbrilFatface,
      fontSize: px(76),
    },
  },
});

function useInterval(callback: VoidFunction, delay: number) {
  const savedCallback = useRef<any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);


  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

type P = {}

export const App = (props: P) => {
  const [counter, setCounter] = React.useState(0);

  useInterval(() => {
    setCounter(counter + 1);
  }, 150);

  return (
    <div className={AppStyle}>
      {[
        PALETTE.WHITE,
        PALETTE.YELLOW,
        PALETTE.PINK,
        PALETTE.GREEN,
        PALETTE.BLUE,
      ].map((color) => (
        <h1 style={{ color: color.toHexString() }}>Hello Slate.</h1>
      ))}
      <p>Counting to {counter}.</p>
    </div>
  );
};
