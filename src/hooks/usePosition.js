import { useState } from "react";

const POS = {
  X: 0,
  Y: 1,
  Z: 2,
};

export default function usePosition(InitialPosition, initialDirection = 0) {
  const [position, setPosition] = useState(InitialPosition);
  const [direction, setDirection] = useState(initialDirection);

  const key = {
    front: 0,
    back: Math.PI,
    left: Math.PI / 2,
    right: -Math.PI / 2,
  };
  const oneStep = 2;

  function handlePositionChange(e) {
    if (e.keyCode === 32) {
      setPosition((prev) => {
        prev[POS.Y] += 10;
        return [...prev];
      });
    }
    if (e.keyCode === 38) {
      setDirection(key.front);
      setPosition((prev) => {
        prev[POS.Z] += oneStep;
        return [...prev];
      });
    }
    if (e.keyCode === 40) {
      setDirection(key.back);
      setPosition((prev) => {
        prev[POS.Z] -= oneStep;
        return [...prev];
      });
    }
    if (e.keyCode === 37) {
      setDirection(key.right);
      setPosition((prev) => {
        prev[POS.X] -= oneStep;
        return [...prev];
      });
    }
    if (e.keyCode === 39) {
      setDirection(key.left);
      setPosition((prev) => {
        prev[POS.X] += oneStep;
        return [...prev];
      });
    }
  }

  return {
    position,
    direction,
    handlePositionChange,
  };
}
