/* eslint-disable react/jsx-props-no-spreading */
import React, {
  Suspense, useEffect, useState,
} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { Vector3 } from "three";

// eslint-disable-next-line import/order

import Building from "./models/Building";
import UserAvatar from "./models/UserAvatar";
import OtherUserAvatar from "./models/OtherUserAvatar";
import GreenFloor from "./models/GreenFloor";
import AdventureMap from "./models/AdventureMap";
import Tree from "./models/Tree";
import Bonfire from "./models/Bonfire";
import DungeonProps from "./models/DungeonProps";
import SpaceTaxi from "./models/SpaceTaxi";
import Fox from "./models/Fox";
import useWorldSocket from "../hooks/useWorldSocket";
import fetchData from "../utils/fetchData";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 90%;
`;

// TODO: 카메라 부재의 문제 없을 시 삭제
// function Camera(props) {
//   const ref = useRef();
//   let count = 0;
//   useFrame(() => {
//     ref.current.position.set([count++, count++, count++]);
//   });

//   return <perspectiveCamera ref={ref} {...props} />;
// }

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
        const response = await fetchData("GET", `/user/random?${params}`);

        setRandomUsers(response);
      } catch (err) {
        throw new Error(err.message);
      }
    }

    getRandomIds();
  }, []);

  function handleBuildingClick(e, id) {
    e.stopPropagation();
    history.push(`/room/${id}`);
  }

  return (
    <Container>
      <Canvas>
        <Sky distance={550000} sunPosition={new Vector3(1000, 100, 1000)} />
        <ambientLight intensity={0.3} />
        <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
        <Suspense fallback={null}>
          {randomUsers.length > 0 && (
            randomUsers.map((randomUser, index) => (
              <Building
                user={randomUser}
                position={[(-300 * index + 1), -25, 10]}
                onClick={handleBuildingClick}
              />
            ))
          )}
        </Suspense>
        <Suspense fallback={null}>
          <UserAvatar position={[-300, -5, 150]} user={user} socket={socket} />
        </Suspense>
        <Suspense fallback={null}>
          {otherUsers.length > 0 && (
            otherUsers.map((otherUser) => (
              <OtherUserAvatar user={otherUser} socket={socket} />
            ))
          )}
        </Suspense>
        <Suspense fallback={null}>
          <AdventureMap
            scale={[0.1, 0.1, 0.1]}
            rotation={[0, -Math.PI, 0]}
            position={[-450, 10, -200]}
          />
          <Tree position={[-1000, 10, 300]} scale={[0.5, 0.5, 0.5]} />
          <Bonfire position={[-500, 10, 300]} scale={[20, 20, 20]} />
          <DungeonProps />
          <SpaceTaxi position={[100, 100, 300]} scale={[40, 40, 40]} />
          <Fox position={[-500, 500, 500]} scale={[40, 40, 40]} />
        </Suspense>
        <GreenFloor />
      </Canvas>
    </Container>
  );
}

World.propTypes = {
  user: PropTypes.object.isRequired,
};

export default World;
