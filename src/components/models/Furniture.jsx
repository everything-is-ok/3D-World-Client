import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Html } from "@react-three/drei";

function Furniture({ name = "furniture", position = [5 * 40, 24, 3 * 40] }) {
  const group = useRef();
  const mesh = useRef();
  // const {
  //   position: dynamicPosition,
  //   direction,
  //   handlePositionChange,
  // } = usePosition(position);

  // useEffect(() => {
  //   window.addEventListener("keydown", handlePositionChange);

  //   return () => window.removeEventListener("keydown", handlePositionChange);
  // }, [dynamicPosition, direction]);

  // useEffect(() => {
  //   if (!socket) {
  //     return;
  //   }

  //   socket.emit("move", { position: dynamicPosition, direction });
  // }, [dynamicPosition, direction, socket]);

  return (
    <group
      ref={group}
      position={position}
    >
      <Html position={[-2, 25, 0]}>
        <h3>{name}</h3>
      </Html>
      <mesh
        ref={mesh}
        rotation={[0, 0, 0]}
      >
        <boxGeometry args={[30, 30, 30]} />
        <meshStandardMaterial color="skyblue" />
      </mesh>
    </group>
  );
}

Furniture.propTypes = {
  position: PropTypes.array.isRequired,
  name: PropTypes.string,
};

export default Furniture;
