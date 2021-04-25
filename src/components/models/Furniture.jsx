import React, { useRef } from "react";
import PropTypes from "prop-types";

import Table from "./Table";

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
        <Table args={[40, 40, 40]} />
        <meshStandardMaterial color="skyblue" />
      </mesh>
      <mesh position={[0, -60, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </group>
  );
}

Furniture.propTypes = {
  position: PropTypes.array.isRequired,
  onClick: PropTypes.func,
};

export default Furniture;
