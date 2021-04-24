import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Bird({
  speed,
  factor,
  url,
  position,
}) {
  const { nodes, materials, animations } = useLoader(GLTFLoader, url);
  const group = useRef();
  const [mixer] = useState(() => new THREE.AnimationMixer());

  useEffect(() => mixer.clipAction(animations[0], group.current).play(), []);

  useFrame((state, delta) => {
    group.current.rotation.y
      -= Math.sin((delta * factor) / 2) * Math.cos((delta * factor) / 2) * 1.5;
    mixer.update(delta * speed);
  });

  return (
    <group ref={group} dispose={null}>
      <scene name="Scene" position={position}>
        <mesh
          name="Object_0"
          morphTargetDictionary={nodes.Object_0.morphTargetDictionary}
          morphTargetInfluences={nodes.Object_0.morphTargetInfluences}
          rotation={[Math.PI / 2, 0, 0]}
          geometry={nodes.Object_0.geometry}
          material={materials.Material_0_COLOR_0}
        />
      </scene>
    </group>
  );
}

Bird.propTypes = {
  speed: PropTypes.number,
  factor: PropTypes.number,
  url: PropTypes.string,
  position: PropTypes.array,
};

export default Bird;
