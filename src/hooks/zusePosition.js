/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { useEffect, useState } from "react";
import _ from "lodash";

const POS = {
  X: 0,
  // Y: 1,
  Z: 1,
};

const key = {
  front: 0,
  back: Math.PI,
  left: Math.PI / 2,
  right: -Math.PI / 2,
};

const oneStep = 40;

function getChangedPosition(array, position, step) {
  return [...array].map((each, index) => {
    if (index === position) {
      return each += step;
    }

    return each;
  });
}

function zusePosition(InitialPosition, initialDirection = 0) {
  const [x, y, z] = InitialPosition;
  const [height, setHeight] = useState(y);
  const [ground, setGround] = useState(y);
  const [velocity, setVelocity] = useState(0);

  const [direction, setDirection] = useState(initialDirection);
  const [position, setPosition] = useState([x, z]);
  const throttleUpdateHeight = _.throttle(updateHeight, 1000);

  function updateHeight() {
    if (height <= ground && velocity < 0) {
      setHeight(ground);
      setVelocity(0);
      return;
    }

    setHeight((prev) => prev + velocity);
    setVelocity((prev) => prev - 5);
  }

  useEffect(() => {
    window.addEventListener("keydown", handlePositionChange);

    return () => window.removeEventListener("keydown", handlePositionChange);
  }, []);

  function handlePositionChange(e) {
    if (e.keyCode === 32) {
      setVelocity(30);
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
    height,
    throttleUpdateHeight,
  };
}

export default zusePosition;
