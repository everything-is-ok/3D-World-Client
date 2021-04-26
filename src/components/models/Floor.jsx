import React from "react";
import PropTypes from "prop-types";
import Grass from "./Grass";

function Floor({
  width,
  height,
  onClick,
  currItemId,
}) {
  return (
    <group rotateX={-Math.PI / 2}>
      {Array.from({ length: width }).map((_, y) => (
        Array.from({ length: height }).map((__, x) => (
          <Grass
            // eslint-disable-next-line react/no-array-index-key
            key={`x:${x}, y:${y}`}
            position={[(x * 40), 10, (y * 40)]}
            onClick={() => onClick(x, y)}
            currItemId={currItemId}
          />
        ))
      ))}
    </group>
  );
}

Floor.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  currItemId: PropTypes.string,
};

export default React.memo(Floor);
