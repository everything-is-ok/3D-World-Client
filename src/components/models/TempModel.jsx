import React, { Suspense, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import Texts from "./Texts";
import Chicken from "./Chicken";
import usePosition from "../../hooks/usePosition";
import SOCKET from "../../constants/socket";
// import zusePosition from "../../hooks/zusePosition";

function TempModel({
  socket,
  id,
  name,
  position,
}) {
  const group = useRef();
  const mesh = useRef();

  const {
    position: dynamicPosition,
    direction,
    initPosition,
  } = usePosition(position);
  const { USER_MOVEMENT, OLD_USER_INFO, NEW_USER_SOCKET_ID } = SOCKET;

  useEffect(() => {
    initPosition();
  }, [socket]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.emit(USER_MOVEMENT, { position: dynamicPosition, direction });
  }, [dynamicPosition, direction, socket]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    function sendPosToNewUser({ socketId }) {
      socket.emit(OLD_USER_INFO, {
        listener: socketId,
        posInfo: { user: { id, name }, position: dynamicPosition, direction },
      });
    }
    // TODO: 맨토님께 질문, 스페이스 쓸지 어절지
    socket.on(NEW_USER_SOCKET_ID, sendPosToNewUser);
    return () => socket.off(NEW_USER_SOCKET_ID, sendPosToNewUser);
  }, [socket, dynamicPosition, direction]);

  const vec = new THREE.Vector3(...dynamicPosition);

  useFrame(() => {
    if (!group.current) {
      return;
    }

    // throttleUpdateHeight();
    group.current.position.lerp(vec, 0.05);
    // group.current.position.y = height;
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
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  socket: PropTypes.any,
};

TempModel.defaultProps = {
  name: "unKnown",
};

export default TempModel;
