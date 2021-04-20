import React, { Suspense } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Chat from "./Chat";
import Floor from "./models/Floor";
import Grugru from "./models/Grugru";
import Mailbox from "./models/Mailbox";
import MailboxModal from "./MailboxModal";
import useRoom from "../hooks/useRoom";
import useModal from "../hooks/useModal";
<<<<<<< HEAD
import useSocket from "../hooks/useSocket";
import Chat from "./Chat";
=======
import { updateUserData } from "../reducers/userSlice";
>>>>>>> b635e34359544ec679b121d81ce0f58a3161fa27

const Container = styled.div`
  position: relative;
  width: 80%;
  height: 100%;

  // NOTE: 사이즈 확인용 border
  border: 2px solid black;
`;

const AbsoluteContainer = styled.div`
  position: absolute;
  left: 1rem;
  top: 1rem;
  width: 40%;
  height: 20%;
`;

// NOTE: room의 id라는 전제로 작성
// TODO: 아주 힘들 예정, 방 정보로 아이템을 배치해야한다.
// TODO: isEditable -> isMyRoom 같은 것으로 바꿔야할듯, 내방니방 많이쓰임.
function Room({ id, isMyRoom }) {
  const { room } = useRoom(id);
  const { modalOpen, toggle } = useModal();
  const socket = useSocket(room?._id);
  const dispatch = useDispatch();

  function ControlCam() {
    useFrame(({ camera }) => camera.lookAt(160, 0, 160));

    return null;
  }

  async function handleAddFriendClick() {
    dispatch(updateUserData({ friend: id }));
  }

  return (
    room ? (
      <Container>
        {/* {JSON.stringify(room)} */}
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
        <AbsoluteContainer>
          <Chat socket={socket} />
        </AbsoluteContainer>
        {isMyRoom ? (
          <button
            type="button"
            onClick={console.log("click")}
          >
            리모델링
          </button>
        ) : (
          <button
            type="button"
            onClick={handleAddFriendClick}
          >
            친구추가
          </button>
        )}
        {modalOpen && (
          <MailboxModal
            mailboxId={room.mailboxId}
            isMyMailbox={isMyRoom}
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
  isMyRoom: PropTypes.bool.isRequired,
};

export default Room;
