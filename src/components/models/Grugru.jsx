import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useGLTF, useAnimations } from "@react-three/drei";
// eslint-disable-next-line import/no-unresolved
import { useBox } from "@react-three/cannon";

function Grugru({ position }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("models/grugru/scene.gltf");
  const { actions } = useAnimations(animations, group);
  const [ref] = useBox(() => ({ mass: 1, position: [0, 40, 0] }));

  useEffect(() => {
    actions["Take 001"].play();
  }, []);

  return (
    <mesh ref={ref}>
      <group
        ref={group}
        position={[0, 8, 0]}
        dispose={null}
      >
        <primitive object={nodes._rootJoint} />
        <skinnedMesh
          geometry={nodes.Body_lambert3_0.geometry}
          material={materials.lambert3}
          skeleton={nodes.Body_lambert3_0.skeleton}
        />
      </group>
    </mesh>
  );
}

Grugru.propTypes = {
  position: PropTypes.array.isRequired,
};

useGLTF.preload("models/grugru/scene.gltf");

export default Grugru;
