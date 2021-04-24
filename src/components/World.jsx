import React, { Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";
import { Vector3 } from "three";
import { useHistory } from "react-router-dom";

// eslint-disable-next-line import/order

import Building from "./models/Building";
import UserAvatar from "./models/UserAvatar";
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
  const [randomUsers, setRandomUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function getRandomIds() {
      const params = new URLSearchParams({
        size: 4,
      });

      try {
        let response = await fetch(`http://localhost:5000/user/random?${params}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        response = await response.json();
        if (response.ok) {
          setRandomUsers(response.data);
          return response.data;
        }

        // NOTE: 에러핸들링, 어찌할지 멘토님께 질문
        throw new Error(response.error.message);
      } catch (err) {
        throw new Error(err);
      }
    }

    getRandomIds();
  }, []);

  return (
    <Container>
      <Canvas camera={{ position: [200, 200, 700], fov: 60 }}>
        <Sky distance={550000} sunPosition={new Vector3(1000, 100, 1000)} />
        <ambientLight intensity={0.3} />
        <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
        <Suspense fallback={null}>
          {randomUsers.length > 0 && (
            randomUsers.map((randomUser, index) => (
              <Building
                user={randomUser}
                position={[(-300 * index + 1), -25, 10]}
              />
            ))
          )}
        </Suspense>
        <Suspense fallback={null}>
          <UserAvatar position={[-300, -5, 150]} user={user} socket={socket} />
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
