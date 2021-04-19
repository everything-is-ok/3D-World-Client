import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

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

// NOTE: 유저정보, 방정보는 State를 내려주지 않고, 각각의 하위 Comp가 redux에서 가져와서 사용한다.
// TODO : URL(ex: localhost:3000/:id)에서 id값을 하위 Comp로 prop으로 전달.
function Main() {
  const { otherUserId } = useParams();
  console.log(otherUserId);
  return (
    <Container>
      {(otherUserId === undefined) ? (
        <MyProfile />
      ) : (
        <OtherUserProfile id={otherUserId} />
      )}
      {/* TODO: World와 Room Comp를 토글방식으로 적용. */}
      <Room />
    </Container>
  );
}

export default Main;
