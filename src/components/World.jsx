import React, {
  Suspense, useEffect, useState,
} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { Vector3 } from "three";

// eslint-disable-next-line import/order

import Building from "./models/Building";
import UserAvatar from "./models/UserAvatar";
import OtherUserAvatar from "./models/OtherUserAvatar";
import GreenFloor from "./models/GreenFloor";
import Tree from "./models/Tree";
import Bonfire from "./models/Bonfire";
import useWorldSocket from "../hooks/useWorldSocket";
import CowHead from "./models/cowHead";
import GirlPirate from "./models/girlPirate";
import PugHead from "./models/PugHead";
import fetchData from "../utils/fetchData";
import { updateError } from "../reducers/roomSlice";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 90%;
`;

function World({ user }) {
  const { socket, otherUsers } = useWorldSocket(user, [10, -5, 150], 0);
  const [randomUsers, setRandomUsers] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getRandomIds() {
      const params = new URLSearchParams({
        size: 4,
      });

      try {
        const response = await fetchData("GET", `/user/random?${params}`);

        setRandomUsers(response);
      } catch (err) {
        dispatch(updateError(err.message));
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
          <Tree position={[-1000, 10, 300]} scale={[0.5, 0.5, 0.5]} />
          <Bonfire position={[-500, 10, 300]} scale={[20, 20, 20]} />
          {/* <AdventureMap
            scale={[0.1, 0.1, 0.1]}
            rotation={[0, -Math.PI, 0]}
            position={[-450, 10, -200]}
          /> */}
          {/* <BoyBrownHair position={[-300, 10, 300]} scale={40} /> */}
          <CowHead position={[-200, 10, 300]} scale={40} />
          <GirlPirate position={[-400, 10, 300]} scale={40} />
          <PugHead position={[-100, 10, 300]} scale={40} />
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
