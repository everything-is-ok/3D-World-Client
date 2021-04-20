import React, { Suspense } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Floor from "./models/Floor";
import Grugru from "./models/Grugru";
import Mailbox from "./models/Mailbox";
import MailboxModal from "./MailboxModal";
import useRoom from "../hooks/useRoom";
import { updateUserData } from "../reducers/userSlice";
import useModal from "../hooks/useModal";
import useSocket from "../hooks/useSocket";

const Container = styled.div`
  width: 80%;
  height: 100%;

  // NOTE: 사이즈 확인용 border
  border: 2px solid black;
`;

// NOTE: room의 id라는 전제로 작성
// TODO: 아주 힘들 예정, 방 정보로 아이템을 배치해야한다.
// TODO: isEditable -> isMyRoom 같은 것으로 바꿔야할듯, 내방니방 많이쓰임.
function Room({ id, isMyRoom }) {
  const { room } = useRoom(id);
  const { modalOpen, toggle } = useModal();
  const dispatch = useDispatch();
  const socket = useSocket("607d59f769658249181d3878", id);

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
