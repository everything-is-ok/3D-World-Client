import React, { Suspense, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import Texts from "./Texts";
import Chicken from "./Chicken";

function TempModel({ name, position: [x, _, z], direction }) {
  const group = useRef();
  const mesh = useRef();
  const vec = new THREE.Vector3(x, _, z);

  useEffect(() => {
    group.current.position.set(x, _, z);
  }, []);

  useFrame(() => {
    group.current.position.lerp(vec, 0.05);
  });

  return (
    <group
      ref={group}
    >
      {/* NOTE: <textGeomety>로 하려고했는데, 현재 font load하는 부분인지 진행이 되지않아 html로 이름 표시함 */}
      <Suspense fallback={null}>
        <Texts letters={name} position={[-12, 45, 0]} />
      </Suspense>
      <mesh
        ref={mesh}
        position={[0, 5, 0]}
        rotation={[0, direction, 0]}
      >
        <group>
          <mesh>
            <boxBufferGeometry args={[14, 14, 20]} />
            <meshStandardMaterial color="#644624" />
          </mesh>
          <mesh position={[0, 0, 12]}>
            <boxBufferGeometry args={[15, 15, 4]} />
            <meshStandardMaterial color="red" />
          </mesh>
          <mesh position={[0, 0, 17]}>
            <boxBufferGeometry args={[16, 16, 10]} />
            <meshStandardMaterial color="#644624" />
          </mesh>
          <mesh position={[0, 0, 22]}>
            <boxBufferGeometry args={[4, 2, 2]} />
            <meshStandardMaterial color="black" />
          </mesh>
          <mesh position={[5, -9, -8]}>
            <boxBufferGeometry args={[4, 4, 4]} />
            <meshStandardMaterial color="#644624" />
          </mesh>
          <mesh position={[-5, -9, -8]}>
            <boxBufferGeometry args={[4, 4, 4]} />
            <meshStandardMaterial color="#644624" />
          </mesh>
          <mesh position={[5, -9, 8]}>
            <boxBufferGeometry args={[4, 4, 4]} />
            <meshStandardMaterial color="#644624" />
          </mesh>
          <mesh position={[-5, -9, 8]}>
            <boxBufferGeometry args={[4, 4, 4]} />
            <meshStandardMaterial color="#644624" />
          </mesh>
        </group>
      </mesh>
      <mesh scale={[0.5, 0.5, 0.5]}>
        <Chicken
          position={[0, -30, 0]}
          direction={0}
          name=""
        />
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
