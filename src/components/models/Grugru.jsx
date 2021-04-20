import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useGLTF, useAnimations } from "@react-three/drei";
import usePosition from "../../hooks/usePosition";

function Grugru({ position }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("models/grugru/scene.gltf");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions["Take 001"].play();
  }, []);

  const {
    position: dynamicPosition,
    direction,
    handlePositionChange,
  } = usePosition(position);

  useEffect(() => {
    window.addEventListener("keydown", handlePositionChange);

    return () => window.removeEventListener("keydown", handlePositionChange);
  }, [dynamicPosition, direction]);

  return (
    <group
      ref={group}
      dispose={null}
      position={[...dynamicPosition]}
      rotation={[0, direction, 0]}
    >
      <primitive object={nodes._rootJoint} />
      <skinnedMesh
        geometry={nodes.Body_lambert3_0.geometry}
        material={materials.lambert3}
        skeleton={nodes.Body_lambert3_0.skeleton}
      />
    </group>
  );
}

Grugru.propTypes = {
  position: PropTypes.array.isRequired,
};

useGLTF.preload("models/grugru/scene.gltf");

export default Grugru;
