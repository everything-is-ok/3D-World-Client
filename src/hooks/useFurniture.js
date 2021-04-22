import { useEffect, useState } from "react";

const POS = {
  X: 0,
  Y: 1,
  Z: 2,
};

export default function useFurniture(InitialPosition, initialDirection = 0) {
  const [position, setPosition] = useState(InitialPosition);
  const [direction, setDirection] = useState(initialDirection);

  const key = {
    front: 0,
    back: Math.PI,
    left: Math.PI / 2,
    right: -Math.PI / 2,
  };

  useEffect(() => {
    window.addEventListener("click", handlePositionChange);

    return () => window.removeEventListener("click", handlePositionChange);
  }, [position, direction, handlePositionChange]);

  function handlePositionChange(e) {
    console.log(e.target);
  }

  return {
    position,
    direction,
    handlePositionChange,
  };
}
