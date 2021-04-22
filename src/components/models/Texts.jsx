/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

/* eslint-disable react/prop-types */
export default function Text({ ...props }) {
  const font = useLoader(THREE.FontLoader, "fonts/bold.blob");
  const config = useMemo(
    () => ({
      font,
      size: 10,
      height: 1,
      curveSegments: 10,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelOffset: 0.1,
      bevelSegments: 10,
    }),
    [font],
  );
  const group = useRef();

  return (
    <>
      <group {...props} ref={group}>
        <mesh>
          <textBufferGeometry args={[props.letters, config]} />
          <meshStandardMaterial
            attach="material"
            metalness={0.2}
            roughness={0.3}
            color="#f7b77e"
          />
        </mesh>
      </group>
    </>
  );
}
