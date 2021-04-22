import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function TempModel({ name, position: [x, _, z], direction }) {
  const group = useRef();
  const mesh = useRef();
  const vec = new THREE.Vector3(x, _, z);

  useEffect(() => {
    group.current.position.set(x, _, z);
  }, []);

  useFrame(() => {
    group.current.position.lerp(vec, 0.1);
  });

  return (
    <group
      ref={group}
    >
      {/* NOTE: <textGeomety>로 하려고했는데, 현재 font load하는 부분인지 진행이 되지않아 html로 이름 표시함 */}
      <Html position={[-2, 25, 0]}>
        <h3>{name}</h3>
      </Html>
      <mesh
        ref={mesh}
        position={[0, 5, 0]}
        rotation={[0, direction, 0]}
      >
        <boxGeometry args={[30, 30, 30]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </group>
  );
}

TempModel.propTypes = {
  position: PropTypes.array.isRequired,
  direction: PropTypes.number.isRequired,
  name: PropTypes.string,
};

TempModel.defaultProps = {
  name: "unKnown",
};

export default TempModel;
