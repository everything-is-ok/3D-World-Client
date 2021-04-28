import React, { Suspense, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Vector3 } from "three";
import { Sky } from "@react-three/drei";

import { userLogin } from "../reducers/userSlice";
import AdventureMap from "./models/AdventureMap";
import UserAvatar from "./models/UserAvatar";
import Texts from "./models/Texts";
import GoogleLoginButton from "./shared/GoogleLoginButton";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const LoginContainer = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  background-color: #ffffff73;
  font-weight: bold;
  color: #222222;
  border-radius: 2px;
  padding: 1rem;
  z-index: 1;
`;

const guest = {
  name: "guest",
};

function Welcome() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  async function handleClick() {
    const actionResult = await dispatch(userLogin());

    try {
      const user = await unwrapResult(actionResult);

      history.push(`/room/${user._id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      <GoogleLoginButton onClick={handleClick}>
        Login with Google
      </GoogleLoginButton>
      {isLoginOpen && (
        <LoginContainer>
          <div>
            로그인 하고 월드로 들어오세요!
          </div>
          <GoogleLoginButton onClick={handleClick}>
            Login with Google
          </GoogleLoginButton>
        </LoginContainer>
      )}
      <Canvas>
        <Sky distance={550000} sunPosition={new Vector3(1000, 100, 1000)} />
        <ambientLight intensity={0.3} />
        <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
        <Suspense fallback={null}>
          {/* <UserAvatar
            position={[0, 0, 0]}
            user={guest}
            socket={null}
            handleCameraStop={() => setIsLoginOpen(true)}
          /> */}
        </Suspense>
        <Suspense fallback={null}>
          <Texts letters="WELCOME" position={[-400, 400, -6000]} scale={12} />
          <Texts letters="3D" position={[-100, 440, -1800]} scale={8} />
          <Texts letters="CYWORLD" position={[-300, 300, -1800]} scale={8} />
        </Suspense>
        <Suspense fallback={null}>
          <AdventureMap
            scale={[0.1, 0.1, 0.1]}
            rotation={[0, -Math.PI, 0]}
            position={[0, 0, 300]}
          />
        </Suspense>
      </Canvas>
    </Container>
  );
}

export default Welcome;
