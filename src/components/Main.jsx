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
  const socket = useSocket(roomOwnerId);

  // NOTE: 확인 필요합니다. 여기서 유저를 바라보기때문에 유저 바뀔 때마다 밑의 룸이 리랜더링하는 경우가 있는지
  const room = useSelector(roomSelector) || null;
  const loggedInUserId = useSelector(userIdSelector);
  const userId = useSelector(userIdSelector);
  const userName = useSelector(userNameSelector);

  // TODO: 필요 없어지면 삭제
  const isLoggedInUser = roomOwnerId === undefined || loggedInUserId === roomOwnerId;
  const { JOIN_ROOM } = EVENTS;

  // NOTE: Room과 프로필 부분을 한번 더 분리해야 리렌더링을 막을 수 있을 것 같습니다.
  const {
    mailboxId,
    isToggled,
    toggle,
    handleClickMailbox,
  } = useMailbox(isLoggedInUser);

  // NOTE: useRoom 과 같음.
  useEffect(() => {
    dispatch(getRoomById(roomOwnerId));
    // TODO: delete this.
    // setPrevUserId(userId);
  }, [roomOwnerId]);

  useEffect(() => {
    if (!socket || !userId || !userName || !room) {
      return;
    }

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
