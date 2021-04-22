/* eslint-disable react/no-children-prop */
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useGLTF, useAnimations, Html } from "@react-three/drei";
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
    if (!socket) {
      return;
    }

    socket.emit("move", { position: dynamicPosition, direction });
  }, [dynamicPosition, direction, socket]);

  return (
    <group
      position={[...dynamicPosition]}
    >
      {/* NOTE: <textGeomety>로 하려고했는데, 현재 font load하는 부분인지 진행이 되지않아 html로 이름 표시함 */}
      <Html position={[-2, 25, 0]}>
        <h3>{name}</h3>
      </Html>
      <group
        ref={group}
        rotation={[0, direction, 0]}
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
