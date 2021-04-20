import React, { useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { useGLTF, useAnimations } from "@react-three/drei";
// eslint-disable-next-line import/no-unresolved
import { useBox, useSphere } from "@react-three/cannon";
import usePosition from "../../hooks/usePosition";

function Grugru({ position }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("models/grugru/scene.gltf");
  const { actions } = useAnimations(animations, group);
  const [ref, api] = useBox(() => ({ mass: 1, args: [20, 20, 20], position }));

  useEffect(() => {
    actions["Take 001"].play();
  }, []);

  const {
    position: dynamicPosition,
    direction,
    handlePositionChange,
  } = usePosition(position);

  api.position.set(...dynamicPosition);

  useEffect(() => {
    window.addEventListener("keydown", handlePositionChange);

    return () => window.removeEventListener("keydown", handlePositionChange);
  }, [dynamicPosition, direction]);

  return (
    <mesh ref={ref}>
      <group
        ref={group}
        position={[0, 8, 0]}
        rotation={[0, direction, 0]}
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
