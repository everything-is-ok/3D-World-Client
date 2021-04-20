import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

import DropDown from "./DropDown";
import { logout } from "../reducers/userSlice";
import MiniProfile from "./MiniProfile";
import StyledButton from "./shared/StyledButton";

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
  // TODO: 방식을 찾거나 지우거나
  // function handleProfileClick(id) {
  //   console.log(id);
  //   return <Redirect push to={`/room/${id}`} />;
  // }

  return (
    <Container>
      <MiniProfile
        photoURL={photoURL}
        name={name}
      />
      <DropDown name="친구 목록">
        {friends.map((friend) => (
          <Link to={`/room/${friend._id}`}>
            <MiniProfile
              key={friend._id}
              photoURL={friend.photoURL}
              name={friend.name}
            />
          </Link>
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
