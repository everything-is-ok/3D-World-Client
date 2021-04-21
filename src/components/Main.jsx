import React from "react";
<<<<<<< HEAD
import styled from "styled-components";
import MainProfile from "./MainProfile";
import Room from "./Room";

=======
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import MyProfile from "./MyProfile";
import OtherUserProfile from "./OtherUserProfile";
import Room from "./Room";
import { userIdSelector, userSelector } from "../reducers/userSlice";

// TODO: 배치 수정
>>>>>>> 4a43d726154bcef751a83d84f4618b34c0886a79
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

<<<<<<< HEAD
function Main() {
  return (
    <Container>
      <MainProfile />
      <Room />
=======
// NOTE: 내 방을 가던 남의 방을 가던 /room/:id 로 온다.
function Main() {
  const { userId } = useParams();
  // NOTE: 확인 필요합니다. 여기서 유저를 바라보기때문에 유저 바뀔 때마다 밑의 룸이 리랜더링하는 경우가 있는지
  const loggedInUserId = useSelector(userIdSelector);
  // TODO: 필요 없어지면 삭제
  const isLoggedInUser = userId === undefined || loggedInUserId === userId;

  return (
    <Container>
      {isLoggedInUser ? (
        <MyProfile />
      ) : (
        <OtherUserProfile id={userId} />
      )}
      {/* TODO: World와 Room Comp를 토글방식으로 적용. */}
      <Room
        id={userId ?? loggedInUserId}
        isMyRoom={isLoggedInUser}
      />
>>>>>>> 4a43d726154bcef751a83d84f4618b34c0886a79
    </Container>
  );
}

export default Main;
