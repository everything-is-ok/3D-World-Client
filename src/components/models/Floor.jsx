import React from "react";
import PropTypes from "prop-types";
import Grass from "./Grass";

function Floor({ width, height }) {
  return (
    <group rotateX={-Math.PI / 2}>
      {Array.from({ length: width }).map((_, y) => (
        Array.from({ length: height }).map((__, x) => (
          <Grass
            // eslint-disable-next-line react/no-array-index-key
            key={`x:${x}, y:${y}`}
            position={[(x * 40), 10, (y * 40)]}
            onClick={() => console.log("X", x, "Y", y)}
          />
        ))
      ))}
    </group>
  );
}

Floor.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default React.memo(Floor);
