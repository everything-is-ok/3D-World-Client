import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { userSelector } from "../reducers/userSlice";

import MyProfile from "./MyProfile";
import OtherUserProfile from "./OtherUserProfile";
import Room from "./Room";

// TODO: 배치 수정
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 85vh;
  padding: 2%;
  margin: 1%;

  // NOTE: 사이즈 확인용 border
  border: 2px solid black;
`;

// NOTE: 내 방을 가던 남의 방을 가던 /room/:id 로 온다.
function Main() {
  const { userId } = useParams();
  // NOTE: 확인 필요합니다. 여기서 유저를 바라보기때문에 유저 바뀔 때마다 밑의 룸이 리랜더링하는 경우가 있는지
  const user = useSelector(userSelector);
  // TODO: 필요 없어지면 삭제
  const isLoggedInUser = userId === undefined || user._id === userId;

  return (
    <Container>
      {isLoggedInUser ? (
        <MyProfile />
      ) : (
        <OtherUserProfile id={userId} />
      )}
      {/* TODO: World와 Room Comp를 토글방식으로 적용. */}
      <Room
        id={userId ?? user._id}
        isEditable={isLoggedInUser}
      />
    </Container>
  );
}

export default Main;
