import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import MyProfile from "./MyProfile";
import Room from "./Room";
import OtherUserProfile from "./OtherUserProfile";
import { userIdSelector, userNameSelector } from "../reducers/userSlice";
import useMailbox from "../hooks/useMailbox";
import useSocket from "../hooks/useSocket";
import MailboxModal from "./MailboxModal";
import Chat from "./Chat";
import { getRoomById, roomSelector } from "../reducers/roomSlice";
import EVENTS from "../constants/socketEvents";

// TODO: 배치 수정
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: auto;
  padding: 1rem;
  border-radius: 8px;
`;

const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  height: 100%;
  padding: 0.5rem;
  margin-right: 1rem;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.cardBorder.color};
  background-color: ${(props) => props.theme.cardBg.color};
`;

// NOTE: 내 방을 가던 남의 방을 가던 /room/:id 로 온다.
function Main() {
  const dispatch = useDispatch();

  const { userId: roomOwnerId } = useParams();
  console.log("💢", roomOwnerId);
  // NOTE: useMailbox의 toggle 변할때마다 추가 connection이 일어남. disconnection은 안됨.
  const socket = useSocket(roomOwnerId);

  // NOTE: 확인 필요합니다. 여기서 유저를 바라보기때문에 유저 바뀔 때마다 밑의 룸이 리랜더링하는 경우가 있는지
  const room = useSelector(roomSelector) || null;
  // TODO: userIdSelector 동일. 하나 삭제
  const loggedInUserId = useSelector(userIdSelector);
  const userId = useSelector(userIdSelector);
  const userName = useSelector(userNameSelector);

  // TODO: 필요 없어지면 삭제
  // NOTE: roomOwnerId가 undefined인 경우는 없는듯?
  const isLoggedInUser = roomOwnerId === undefined || loggedInUserId === roomOwnerId;
  const { JOIN_ROOM } = EVENTS;

  // NOTE: Room과 프로필 부분을 한번 더 분리해야 리렌더링을 막을 수 있을 것 같습니다.
  // TODO: isLoggedInUser는 boolean인데, useMailbox내부에서 destructuring하고있음. 확인 필요
  const {
    mailboxId,
    isToggled,
    toggle,
    handleClickMailbox,
  } = useMailbox(isLoggedInUser);

  // NOTE: useRoom 과 같음.
  useEffect(() => {
    // NOTE: thunk에서 room을 null로 바로 변경해서, re-render를 일으킴.
    dispatch(getRoomById(roomOwnerId));
    // TODO: delete this.
    // setPrevUserId(userId);
  }, [roomOwnerId]);

  useEffect(() => {
    // NOTE: 방 이동시, socket이 바뀜과 room === null 동시
    // NOTE: join room emit 아직 안 보냄.
    if (!socket || !userId || !userName || !room) {
      return;
    }

    // NOTE: room이 true가 되면, emit하기 전에, Room이 먼저 mount됨.
    // NOTE: Room 내부 socket관련 effect들과 같은 context로 실행.
    socket.emit(JOIN_ROOM, { user: { id: userId, name: userName }, roomId: room._id });
  }, [socket, userId, userName, room]);

  return (
    <Container>
      <SideContainer>
        {isLoggedInUser ? (
          <MyProfile />
        ) : (
          <OtherUserProfile id={roomOwnerId} />
        )}
        <Chat socket={socket} />
      </SideContainer>
      {/* TODO: World와 Room Comp를 토글방식으로 적용. */}
      {room ? (
        <>
          <Room
            socket={socket}
            id={roomOwnerId}
            room={room}
            isMyRoom={isLoggedInUser}
            // NOTE: isToggled가 toggle될때마다, handleClickMailbox의 reference값이 변함.
            // NOTE: Room을 React.memo했음에도 불필요한 re-render.
            handleClickMailbox={handleClickMailbox}
          />
          {isToggled && (
            <MailboxModal
              toggle={toggle}
              mailboxId={mailboxId}
              isMyMailbox={isLoggedInUser}
            />
          )}
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </Container>
  );
}

export default Main;
