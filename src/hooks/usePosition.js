/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { useEffect, useState } from "react";

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

const oneStep = 20;

function getChangedPosition(array, position, step) {
  return [...array].map((each, index) => {
    if (index === position) {
      return each += step;
    }

    return each;
  });
}

export default function usePosition(InitialPosition, initialDirection = 0) {
  const [position, setPosition] = useState(InitialPosition);
  const [direction, setDirection] = useState(initialDirection);
  const initialY = InitialPosition[POS.Y];

  useEffect(() => {
    const ID = setTimeout(() => {
      setPosition((prev) => [...prev].map((each, index) => {
        if (index === POS.Y) {
          return each = initialY;
        }

        return each;
      }));
    }, 20);

    return () => clearTimeout(ID);
  }, [position[POS.Y]]);

  useEffect(() => {
    window.addEventListener("keydown", handlePositionChange);

    return () => window.removeEventListener("keydown", handlePositionChange);
  }, []);

  function handlePositionChange(e) {
    if (e.keyCode === 32) {
      setPosition((prev) => getChangedPosition(prev, POS.Y, oneStep));
    }
    if (e.keyCode === 40) {
      setDirection(key.front);
      setPosition((prev) => getChangedPosition(prev, POS.Z, oneStep));
    }
    if (e.keyCode === 38) {
      setDirection(key.back);
      setPosition((prev) => getChangedPosition(prev, POS.Z, -oneStep));
    }
    if (e.keyCode === 37) {
      setDirection(key.right);
      setPosition((prev) => getChangedPosition(prev, POS.X, -oneStep));
    }
    if (e.keyCode === 39) {
      setDirection(key.left);
      setPosition((prev) => getChangedPosition(prev, POS.X, oneStep));
    }
  }

  return {
    position,
    direction,
    handlePositionChange,
  };
}
