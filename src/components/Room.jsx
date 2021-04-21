import React, { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Chat from "./Chat";
import StyledButton from "./shared/StyledButton";
import Floor from "./models/Floor";
import Grugru from "./models/Grugru";
import Mailbox from "./models/Mailbox";
import useRoom from "../hooks/useRoom";
import useSocket from "../hooks/useSocket";
import { updateUserData, userIdSelector } from "../reducers/userSlice";

const Container = styled.div`
  position: relative;
  width: 80%;
  height: 100%;

  // NOTE: 사이즈 확인용 border
  border: 2px solid black;
`;

const AbsoluteContainer = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
  width: 40%;
  height: 20%;
`;

// NOTE: room의 id라는 전제로 작성
// NOTE: MainProfle에서 submit하면, re-render가 일어나지만, Main이 re-render되서가 아니라, Room내부에서 user를 조회하기때문.
// TODO: mailbox click했을때, re-render 최적화
// TODO: 아주 힘들 예정, 방 정보로 아이템을 배치해야한다.
function Room({ id, toggle }) {
  const { room } = useRoom(id);
  const socket = useSocket(room?._id);
  const dispatch = useDispatch();

  const userId = useSelector(userIdSelector);
  // TODO: 필요 없어지면 삭제
  const isMyRoom = id === undefined || userId === id;

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
          <Suspense>
            <Grugru
              socket={socket}
              name="나"
              position={[4 * 40, 24, 7 * 40]}
            />
            <Mailbox
              position={[7 * 40, 7 * 40]}
              onClick={() => toggle(room._id)}
            />
          </Suspense>
          <Floor width={8} height={8} />
          <OrbitControls />
          <ControlCam />
        </Canvas>
        <AbsoluteContainer>
          <Chat socket={socket} />
        </AbsoluteContainer>
        {isMyRoom ? (
          <StyledButton
            type="button"
            onClick={console.log("click reomeling")}
          >
            리모델링
          </StyledButton>
        ) : (
          <StyledButton
            type="button"
            onClick={handleAddFriendClick}
          >
            친구추가
          </StyledButton>
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
  toggle: PropTypes.string.isRequired,
  // handleClickMailbox: PropTypes.string.isRequired,
};

export default Room;
