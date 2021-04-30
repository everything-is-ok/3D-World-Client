import React, {
  Suspense, useEffect, useState,
} from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { PositionalAudio, Sky } from "@react-three/drei";
import { Vector3 } from "three";

import Building from "./models/Building";
import UserAvatar from "./models/UserAvatar";
import OtherUserAvatar from "./models/OtherUserAvatar";
import GreenFloor from "./models/GreenFloor";
import Tree from "./models/Tree";
import Bonfire from "./models/Bonfire";
import CowHead from "./models/cowHead";
import GirlPirate from "./models/girlPirate";
import PugHead from "./models/PugHead";
import SpongeHouse from "./models/SpongeHouse";
import GardenHouse from "./models/GardenHouse";
import AnimalHouse from "./models/AnimalHouse";
import fetchData from "../utils/fetchData";
import { updateError } from "../reducers/roomSlice";
import { userSelector } from "../reducers/userSlice";
import { worldSocket } from "../utils/socket";
import Fireflies from "./models/fireflies";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 90%;
`;

const defaultPosition = [10, -5, 150];
const defaultDirection = 0;

function World() {
  const user = useSelector(userSelector);
  const [otherUsers, setOtherUsers] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  function updateOtherUsers(userInfo) {
    setOtherUsers((prev) => prev.concat(userInfo));
  }

  function removeOtherUser(userInfo) {
    setOtherUsers((prev) => prev.filter((oldUser) => oldUser._id !== userInfo._id));
  }

  useEffect(() => {
    worldSocket.joinWorld({
      ...user,
      position: defaultPosition,
      direction: defaultDirection,
    });

    worldSocket.listenOldUserInfo(updateOtherUsers);
    worldSocket.listenNewUserInfo(updateOtherUsers);
    worldSocket.listenUserLeave(removeOtherUser);

    return () => {
      worldSocket.leaveWorld();
      worldSocket.removeWorldListeners();
    };
  }, [user]);

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

  function handleMouseEnter(e, data) {
    e.stopPropagation();
    console.log(data);
  }

  return (
    <Container>
      <Canvas>
        {/* <Sky distance={55000} sunPosition={new Vector3(1000, 100, 1000)} /> */}
        <color attach="background" args={["#1e2243"]} />
        <ambientLight intensity={0.3} />
        {/* TODO <pointLight castShadow intensity={0.8} position={[100, 100, 100]} /> */}
        <Suspense fallback={null}>
          {randomUsers.length > 0 && (
            randomUsers.map((randomUser, index) => (
              <Building
                user={randomUser}
                position={[(-500 * index + 1), -25, 10]}
                onClick={handleBuildingClick}
                onMouseEnter={handleMouseEnter}
              />
            ))
          )}
        </Suspense>
        <Suspense fallback={null}>
          <UserAvatar position={[-300, -5, 150]} user={user} />
        </Suspense>
        <Suspense fallback={null}>
          {otherUsers.length > 0 && (
            otherUsers.map((otherUser) => (
              <OtherUserAvatar user={otherUser} />
            ))
          )}
        </Suspense>
        <Suspense fallback={null}>
          <Tree position={[-1000, 10, 300]} scale={[0.5, 0.5, 0.5]} />
          <Bonfire position={[-500, 10, 300]} scale={[20, 20, 20]} />
          <AnimalHouse position={[-1200, 0, 0]} sclae={20} />
          <GardenHouse position={[-800, 0, -600]} />
          {/* <SpongeHouse position={[200, -45, 300]} /> */}
          {/* <CowHead position={[-200, 10, 300]} scale={30} />
          <GirlPirate position={[-400, 10, 300]} scale={30} />
          <PugHead position={[-100, 10, 300]} scale={30} /> */}
        </Suspense>
        <GreenFloor />
      </Canvas>
    </Container>
  );
}

export default World;
