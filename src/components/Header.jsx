import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

import MiniProfile from "./MiniProfile";
import StyledButton from "./shared/StyledButton";
import { logout } from "../reducers/userSlice";
import DropDown from "./DropDown";

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  padding: 1%;
  border-bottom: 2px solid black;
`;

function Header() {
  const dispatch = useDispatch();
  const { name, photoURL, friends } = useSelector((state) => state.user.data);

  function handleProfileClick(id) {
    return <Redirect to={`/room/${id}`} />;
  }

  return (
    <Container>
      <MiniProfile
        photoURL={photoURL}
        name={name}
      />
      <DropDown name="친구 목록">
        {friends.map((friend) => (
          <MiniProfile
            key={friend._id}
            photoURL={friend.photoURL}
            name={friend.name}
            onClick={() => handleProfileClick(friend._id)}
          />
        ))}
      </DropDown>
      <div>
        {/* TODO: 월드, 홈 버튼은 토글방식으로 컴포넌트 분리 */}
        <StyledButton>월드</StyledButton>
        <StyledButton>홈</StyledButton>
        <StyledButton onClick={() => dispatch(logout())}>로그아웃</StyledButton>
      </div>
    </Container>
  );
}

export default Header;
