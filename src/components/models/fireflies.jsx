import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import PropTypes from "prop-types";
import { useFrame } from "@react-three/fiber";

import "./shaders/fireflyMaterial";

export default function Fireflies({ count = 40, pos }) {
  const shader = useRef();
  const [positionArray, scaleArray] = useMemo(() => {
    const position = new Float32Array(count * 3);
    const scale = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      new THREE.Vector3((Math.random() - 0.5) * 4, Math.random() * 1.5, (Math.random() - 0.5) * 4).toArray(position, i * 3);
      scale[i] = Math.random();
    }

    return [position, scale];
  }, [count]);

  useFrame((state, delta) => {
    shader.current.time += delta / 2;
  });

  return (
    <points key={count}>
      <bufferGeometry>
        <bufferAttribute attachObject={["attributes", "position"]} count={count} array={positionArray} itemSize={3} />
        <bufferAttribute attachObject={["attributes", "aScale"]} count={count} array={scaleArray} itemSize={1} />
      </bufferGeometry>
      <fireflyMaterial ref={shader} transparent depthWrite={false} />
    </points>
  );
}

Fireflies.propTypes = {
  count: PropTypes.number.isRequired,
  pos: PropTypes.object,
};
