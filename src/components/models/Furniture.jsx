import React, { useRef } from "react";
import PropTypes from "prop-types";

import ChildFurniture from "./ChildFurniture";

function Furniture({
  name,
  position,
  isSelected,
  onClick,
}) {
  const group = useRef();
  const mesh = useRef();

  return (
    <group ref={group} position={position}>
      <mesh
        ref={mesh}
        rotation={[0, 0, 0]}
        onClick={onClick}
      >
        <ChildFurniture name={name} isSelected={isSelected} />
      </mesh>
    </group>
  );
}

Furniture.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.array,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Furniture;
