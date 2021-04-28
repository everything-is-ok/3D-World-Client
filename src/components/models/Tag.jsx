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
    >
      <tetrahedronGeometry
        attach="geometry"
        args={args}
        applyMatrix={new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(2, 0, -1).normalize(),
          Math.atan(Math.sqrt(2)),
        )}
      />
      <meshStandardMaterial
        attach="material"
        color="#06ad22"
      />
    </mesh>
  );
}

Tag.propTypes = {
  position: PropTypes.array,
  args: PropTypes.array,
};

export default Tag;
