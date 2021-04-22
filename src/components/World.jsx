import React, { Suspense } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";
import { Vector3 } from "three";

// eslint-disable-next-line import/order

import Building from "./models/Building";
import UserAvatar from "./models/UserAvatar";
import Texts from "./models/Texts";
import OtherUserAvatar from "./models/OtherUserAvatar";
import useWorldSocket from "../hooks/useWorldSocket";
import GreenFloor from "./models/GreenFloor";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 90%;

  // NOTE: 사이즈 확인용 border
  border: 2px solid black;
`;

function World({ user }) {
  const { socket, otherUsers } = useWorldSocket(user, [10, -5, 150], 0);

  return (
    <Container>
      <Canvas camera={{ position: [160, 100, 400], fov: 80 }}>
        <Sky distance={450000} sunPosition={new Vector3(1000, 100, 1000)} />
        <ambientLight intensity={0.3} />
        <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
        <Suspense fallback={null}>
          <Texts position={[-50, 200, 10]} letters="CHICKENHOUSE" />
        </Suspense>
        <Building position={[-300, -10, 10]} />
        <Building position={[-150, -10, 10]} />
        <Building position={[0, -10, 10]} />
        <Building position={[150, -10, 10]} />
        <Building position={[250, -10, 10]} />
        <Building position={[350, -10, 10]} />
        <Suspense fallback={null}>
          <UserAvatar position={[10, -5, 150]} user={user} socket={socket} />
          {otherUsers.length > 0 && (
            otherUsers.map((otherUser) => (
              <OtherUserAvatar user={otherUser} socket={socket} />
            ))
          )}
        </Suspense>
        <GreenFloor />
        <OrbitControls />
      </Canvas>
    </Container>
  );
}

World.propTypes = {
  user: PropTypes.object.isRequired,
};

export default World;
