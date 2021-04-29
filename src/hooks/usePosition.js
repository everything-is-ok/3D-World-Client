/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { useEffect, useRef } from "react";

const POS = {
  X: 0,
  Y: 1,
  Z: 2,
};

const key = {
  front: 0,
  back: Math.PI,
  left: Math.PI / 2,
  right: -Math.PI / 2,
};

const oneStep = 40;

function getChangedPosition(array, position, step) {
  return array.map((each, index) => {
    if (index === position) {
      return each += step;
    }

    return each;
  });
}

function usePosition(
  initialPosition,
  initialDirection = 0,
  onChange,
) {
  const positionRef = useRef(initialPosition);
  const directionRef = useRef(initialDirection);

  const initialY = initialPosition[POS.Y];

  // useEffect(() => {
  //   const ID = setTimeout(() => {
  //     setPosition((prev) => [...prev].map((each, index) => {
  //       if (index === POS.Y) {
  //         return each = initialY;
  //       }

  //       return each;
  //     }));
  //   }, 20);

  //   return () => clearTimeout(ID);
  // }, [position[POS.Y]]);

  useEffect(() => {
    window.addEventListener("keydown", handlePositionChange);

    return () => window.removeEventListener("keydown", handlePositionChange);
  }, []);

  function handlePositionChange(e) {
    if (e.target.tagName === "INPUT") {
      return;
    }

    const prevPosition = positionRef.current;

<<<<<<< HEAD
=======
    // TODO: 점프
>>>>>>> 600b96a24b014b2f1350c156fc9278ea0f56b7fc
    // if (e.keyCode === 32) {
    //   setPosition((prev) => getChangedPosition(prev, POS.Y, 250));
    // }
    if (e.keyCode === 40) {
      directionRef.current = key.front;
      positionRef.current = getChangedPosition(prevPosition, POS.Z, oneStep);
    }
    if (e.keyCode === 38) {
      directionRef.current = key.back;
      positionRef.current = getChangedPosition(prevPosition, POS.Z, -oneStep);
    }
    if (e.keyCode === 37) {
      directionRef.current = key.right;
      positionRef.current = getChangedPosition(prevPosition, POS.X, -oneStep);
    }
    if (e.keyCode === 39) {
      directionRef.current = key.left;
      positionRef.current = getChangedPosition(prevPosition, POS.X, oneStep);
    }

    onChange();
  }

  function initPosition() {
    directionRef.current = initialDirection;
    positionRef.current = initialPosition;
  }

  return {
    positionRef,
    directionRef,
    handlePositionChange,
    initPosition,
  };
}

export default usePosition;
