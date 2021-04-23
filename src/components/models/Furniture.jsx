import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Html } from "@react-three/drei";

import useFurniture from "../../hooks/useFurniture";

function Furniture({
  id,
  name = "furniture",
  position = [5 * 40, 24, 3 * 40],
  isEditMode,
  onClick,
}) {
  const group = useRef();
  const mesh = useRef();
  // const {
  //   position: currentPosition,
  //   direction,
  //   handlePositionChange,
  // } = useFurniture(position);
  // const [pos, setPos] = useState(position);

  return (
    <group
      ref={group}
      position={position}
    >
      <Html position={[-2, 25, 0]}>
        <h3>{name}</h3>
      </Html>
      <mesh
        ref={mesh}
        rotation={[0, 0, 0]}
        onClick={onClick}
      >
        <boxGeometry args={[30, 30, 30]} />
        <meshStandardMaterial color="skyblue" />
      </mesh>
    </group>
  );
}

Furniture.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  position: PropTypes.array,
  isEditMode: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Furniture;
