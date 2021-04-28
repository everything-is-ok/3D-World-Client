import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import StyledButton from "./shared/StyledButton";
import RoomCanvas from "./RoomCanvas";
import { updateUserData, userIdSelector } from "../reducers/userSlice";

const Container = styled.div`
  position: relative;
  width: 80%;
  height: 100%;
`;

const AButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

// NOTE: room의 id라는 전제로 작성
// NOTE: MainProfle에서 submit하면, re-render가 일어나지만, Main이 re-render되서가 아니라, Room내부에서 user를 조회하기때문.
// TODO: mailbox click했을때, re-render 최적화
// TODO: 아주 힘들 예정, 방 정보로 아이템을 배치해야한다.
function Room({
  roomOwnerId,
  room,
  handleClickMailbox,
  isSocketReady,
}) {
  const userId = useSelector(userIdSelector);
  const dispatch = useDispatch();

  const [isEditMode, setIsEditMode] = useState(false);
  const isMyRoom = userId === roomOwnerId;

  // TODO: 친구추가와 유저정보 변경 redux reducer분리
  // NOTE: 친구 추가를 해도, redux store user 객체를 통으로 바꿔줘서, App comp에서 re-render
  // NOTE: 그로인해, socket connect 재 실행 유발
  async function handleAddFriendClick() {
    dispatch(updateUserData({ friend: roomOwnerId }));
  }

  return (
    <Container>
      <RoomCanvas
        isSocketReady={isSocketReady}
        room={room}
        userId={userId}
        handleClickMailbox={handleClickMailbox}
        isEditMode={isEditMode}
      />
      {isMyRoom ? (
        <AButton
          type="button"
          onClick={() => setIsEditMode(((prev) => !prev))}
        >
          리모델링 🪑
        </AButton>
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
  roomOwnerId: PropTypes.string.isRequired,
  room: PropTypes.object.isRequired,
  handleClickMailbox: PropTypes.func.isRequired,
  isSocketReady: PropTypes.bool,
};

export default React.memo(Room);
