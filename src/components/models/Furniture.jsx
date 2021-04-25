import React, { useRef } from "react";
import PropTypes from "prop-types";

function Furniture({ position, onClick }) {
  const group = useRef();
  const mesh = useRef();

  return (
    <group
      ref={group}
      position={position}
    >
      <mesh
        ref={mesh}
        rotation={[0, 0, 0]}
        onClick={onClick}
      >
        <boxGeometry args={[50, 50, 50]} />
        <meshStandardMaterial color="skyblue" />
      </mesh>
    </group>
  );
}

Furniture.propTypes = {
  position: PropTypes.array,
  onClick: PropTypes.func,
};

export default Furniture;
