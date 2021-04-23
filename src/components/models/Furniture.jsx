import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Html } from "@react-three/drei";

function Furniture({
  name = "furniture",
  position,
  onClick,
}) {
  const group = useRef();
  const mesh = useRef();

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
  name: PropTypes.string,
  position: PropTypes.array,
  onClick: PropTypes.func,
};

export default Furniture;
