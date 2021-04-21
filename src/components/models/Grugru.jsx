import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useGLTF, useAnimations } from "@react-three/drei";
import usePosition from "../../hooks/usePosition";

function Grugru({ name, position, socket }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("models/grugru/scene.gltf");
  const { actions } = useAnimations(animations, group);
  const {
    position: dynamicPosition,
    direction,
    handlePositionChange,
  } = usePosition(position);

  useEffect(() => {
    actions["Take 001"].play();
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handlePositionChange);

    return () => window.removeEventListener("keydown", handlePositionChange);
  }, [dynamicPosition, direction]);

  useEffect(() => {
    socket.emit("move", { position: dynamicPosition, direction });
  }, [dynamicPosition, direction]);

  return (
    <group
      position={[...dynamicPosition]}
    >
      <group
        ref={group}
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
    </group>
  );
}

Grugru.propTypes = {
  position: PropTypes.array.isRequired,
  socket: PropTypes.any,
  name: PropTypes.string,
};

Grugru.defaultProps = {
  name: "unKnown",
};

useGLTF.preload("models/grugru/scene.gltf");

export default Grugru;
