import React, { Suspense } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Floor from "./models/Floor";
import Grugru from "./models/Grugru";
import Mailbox from "./models/Mailbox";

const Container = styled.div`
  width: 80%;
  height: 100%;

  // NOTE: 사이즈 확인용 border
  border: 2px solid black;
`;

// NOTE: room의 id라는 전제로 작성
// TODO: 아주 힘들 예정, 방 정보로 아이템을 배치해야한다.
function Room({ id }) {
  function ControlCam() {
    useFrame(({ camera }) => camera.lookAt(160, 0, 160));

    return null;
  }

  return (
    <Container>
      <Canvas camera={{ position: [160, 100, 400], fov: 80 }}>
        <ambientLight intensity={2} />
        <pointLight position={[40, 40, 40]} />
        <Floor width={8} height={8} />
        <Suspense>
          <Grugru position={[4 * 40, 7 * 40]} />
          <Mailbox
            position={[7 * 40, 7 * 40]}
            onClick={() => console.log("Mailbox is clicked!")}
          />
        </Suspense>
        <OrbitControls />
        <ControlCam />
      </Canvas>
    </Container>
  );
}

Room.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Room;
