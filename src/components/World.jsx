import React, { Suspense } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";

// eslint-disable-next-line import/order
import {
  Vector3,
  TextureLoader,
  RepeatWrapping,
} from "three";

import Building from "./models/Building";
import Chicken from "./models/Chicken";
import grassImg from "./models/textures/grass.jpeg";
import Texts from "./models/Texts";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 90%;

  // NOTE: 사이즈 확인용 border
  border: 2px solid black;
`;

function World({ id }) {
  function Floor() {
    const texture = new TextureLoader().load(grassImg);
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(240, 240);

    return (
      <mesh receiveShadow position={[10, 2, 10]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxBufferGeometry attach="geometry" args={[5000, 5000]} />
        <meshStandardMaterial map={texture} attach="material" color="green" />
      </mesh>
    );
  }

  return (
    <Container>
      <Canvas camera={{ position: [160, 100, 400], fov: 80 }}>
        <Sky distance={450000} sunPosition={new Vector3(1000, 100, 1000)} />
        <ambientLight intensity={0.3} />
        <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
        <Suspense fallback={null}>
          <Texts position={[40, 150, 10]} letters="CHICKENHOUSE" />
        </Suspense>
        <Building position={[-50, -10, 10]} />
        <Building position={[-20, -10, 10]} />
        <Building position={[10, -10, 10]} />
        <Building position={[40, -10, 10]} />
        <Building position={[140, -10, 140]} />
        <Building position={[240, -10, 40]} />
        <Suspense fallback={null}>
          <Chicken position={[10, -5, 40]} />
        </Suspense>
        <Floor />
        <OrbitControls />
      </Canvas>
    </Container>
  );
}

World.propTypes = {
  id: PropTypes.string.isRequired,
};

export default World;
