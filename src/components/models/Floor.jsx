import React from "react";
import PropTypes from "prop-types";
import { nanoid } from "@reduxjs/toolkit";

import Grass from "./Grass";

function Floor({ width, height }) {
  return (
    <mesh rotateX={-Math.PI / 2}>
      {Array.from({ length: width }).map((_, y) => (
        Array.from({ length: height }).map((__, x) => (
          <Grass
            key={nanoid}
            position={[(x * 40), 0, (y * 40)]}
            onClick={() => console.log("X", x, "Y", y)}
          />
        ))
      ))}
    </mesh>
  );
}

Floor.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Floor;
