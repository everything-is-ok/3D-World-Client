import { useEffect, useState } from "react";

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

  useEffect(() => {
    window.addEventListener("keydown", handlePositionChange);

    return () => window.removeEventListener("keydown", handlePositionChange);
  }, []);

  // useEffect(() => {
  //   const ID = setTimeout(() => {
  //     setPosition((prev) => {
  //       prev[POS.Y] = initialY;
  //       return [...prev];
  //     });
  //   }, 20);

  //   return () => clearTimeout(ID);
  // }, [position]);

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
