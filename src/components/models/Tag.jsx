import React, { useRef } from "react";
import PropTypes from "prop-types";
import * as THREE from "three";

function Tag({ position, args }) {
  const mesh = useRef(null);

  return (
    <mesh
      ref={mesh}
      scale={1}
      position={position}
      rotateX={Math.PI / 2}
    >
      <coneGeometry args={[7, 10, 10]} />
      <meshStandardMaterial
        attach="material"
        color="#ff0000"
      />
    </mesh>
  );
}

Tag.propTypes = {
  position: PropTypes.array,
  args: PropTypes.array,
};

export default Tag;
