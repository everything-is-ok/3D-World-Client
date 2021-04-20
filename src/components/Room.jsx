import React, { Suspense } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Floor from "./models/Floor";
import Grugru from "./models/Grugru";
import Mailbox from "./models/Mailbox";
import MailboxModal from "./MailboxModal";
import useRoom from "../hooks/useRoom";
import useModal from "../hooks/useModal";

const Container = styled.div`
  width: 80%;
  height: 100%;

  // NOTE: 사이즈 확인용 border
  border: 2px solid black;
`;

// NOTE: room의 id라는 전제로 작성
// TODO: 아주 힘들 예정, 방 정보로 아이템을 배치해야한다.
function Room({ id, isEditable }) {
  const { room } = useRoom(id);
  const { modalOpen, toggle } = useModal();

  function ControlCam() {
    useFrame(({ camera }) => camera.lookAt(160, 0, 160));

    return null;
  }

  return (
    room ? (
      <Container>
        {JSON.stringify(room)}
        <Canvas camera={{ position: [160, 100, 400], fov: 80 }}>
          <ambientLight intensity={2} />
          <pointLight position={[40, 40, 40]} />
          <Floor width={8} height={8} />
          <Suspense>
            <Grugru position={[4 * 40, 7 * 40]} />
            <Mailbox
              position={[7 * 40, 7 * 40]}
              onClick={toggle}
            />
          </Suspense>
          <OrbitControls />
          <ControlCam />
        </Canvas>
        {isEditable && (
          <button type="button">
            리모델링
          </button>
        )}
        {modalOpen && (
          <MailboxModal
            mailboxId={room.mailboxId}
            isMyMailbox={isEditable}
            handleClose={toggle}
          />
        )}
      </Container>
    ) : (
      <>
        <h1>
          {/* FIXME store 사용 & 로딩컴포넌트 */}
          Loading...
        </h1>
      </>
    )
  );
}

Room.propTypes = {
  id: PropTypes.string.isRequired,
  isEditable: PropTypes.bool.isRequired,
};

export default Room;
