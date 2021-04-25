import React, { Suspense, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import Texts from "./Texts";
import Chicken from "./Chicken";
import usePosition from "../../hooks/usePosition";

function TempModel({
  socket,
  id,
  name,
  position,
}) {
  const group = useRef();
  const mesh = useRef();

  const { position: dynamicPosition, direction } = usePosition(position);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.emit("user movement", { position: dynamicPosition, direction });
  }, [dynamicPosition, direction, socket]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    function sendPosToNewUser({ socketId }) {
      socket.emit("old user info", {
        listener: socketId,
        posInfo: { user: { id, name }, position: dynamicPosition, direction },
      });
    }
    // TODO: 맨토님께 질문, 스페이스 쓸지 어절지
    socket.on("new user socket id", sendPosToNewUser);
    return () => socket.off("new user socket id", sendPosToNewUser);
  }, [socket, dynamicPosition, direction]);

  const vec = new THREE.Vector3(...dynamicPosition);

  useFrame(() => {
    if (!group.current) {
      return;
    }

    group.current.position.lerp(vec, 0.05);
  });

  return (
    <group
      ref={group}
    >
      <Suspense fallback={null}>
        <Texts letters={name} position={[-12, 45, 0]} />
      </Suspense>
      <mesh
        ref={mesh}
        position={[0, 5, 0]}
        rotation={[0, direction, 0]}
        receiveShadow
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
        <Suspense fallback={null}>
          <Chicken
            position={[0, -30, 0]}
            direction={0}
            name=""
          />
        </Suspense>
      </mesh>
    </group>
  );
}

TempModel.propTypes = {
  position: PropTypes.array.isRequired,
  socket: PropTypes.any.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
};

TempModel.defaultProps = {
  name: "unKnown",
};

export default TempModel;
