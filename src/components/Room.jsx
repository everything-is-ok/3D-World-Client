import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import StyledButton from "./shared/StyledButton";
import RoomCanvas from "./RoomCanvas";
import { updateUserData, userIdSelector, userNameSelector } from "../reducers/userSlice";

const Container = styled.div`
  position: relative;
  width: 80%;
  height: 100%;

  // NOTE: 사이즈 확인용 border
  border: 2px solid black;
`;

// NOTE: room의 id라는 전제로 작성
// NOTE: MainProfle에서 submit하면, re-render가 일어나지만, Main이 re-render되서가 아니라, Room내부에서 user를 조회하기때문.
// TODO: mailbox click했을때, re-render 최적화
// TODO: 아주 힘들 예정, 방 정보로 아이템을 배치해야한다.
function Room({
  id,
  room,
  socket,
  handleClickMailbox,
}) {
  const userId = useSelector(userIdSelector);
  const userName = useSelector(userNameSelector);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!socket || !userId || !userName || !room) {
  //     return;
  //   }

  //   socket.emit("join room", { user: { id: userId, name: userName }, roomId: room._id });
  // }, [socket, userId, userName, room]);

  // TODO: 필요 없어지면 삭제
  const isMyRoom = id === undefined || userId === id;

  async function handleAddFriendClick() {
    dispatch(updateUserData({ friend: id }));
  }

  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Container>
      <RoomCanvas
        socket={socket}
        room={room}
        userId={userId}
        userName={userName}
        handleClickMailbox={handleClickMailbox}
        isEditMode={isEditMode}
      />
      {isMyRoom ? (
        <StyledButton
          type="button"
          onClick={() => setIsEditMode(((prev) => !prev))}
        >
          리모델링 🪑
        </StyledButton>
      ) : (
        <StyledButton
          type="button"
          onClick={handleAddFriendClick}
        >
          {/* TODO 친구사이면 버튼 안나오게 수정 */}
          친구추가
        </StyledButton>
      )}
    </Container>
  );
}

// TODO: socket proptypes?
Room.propTypes = {
  id: PropTypes.string.isRequired,
  socket: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired,
  handleClickMailbox: PropTypes.func.isRequired,
};

export default React.memo(Room);
