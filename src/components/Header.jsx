import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import MiniProfile from "./MiniProfile";
import StyledButton from "./shared/StyledButton";
import { logout } from "../reducers/userSlice";

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
  const { name, photoURL } = useSelector((state) => state.user.data);

  return (
    <Container>
      {/* TODO: photo url만 전달할지, alt 등 추가 정보 결정 */}
      <MiniProfile
        photoURL={photoURL}
        name={name}
      />

      <div>
        {/* TODO: 월드, 홈 버튼은 토글방식으로 컴포넌트 분리 */}
        <StyledButton>월드</StyledButton>
        <StyledButton>홈</StyledButton>

        {/* TODO: 로그아웃 기능 추가 */}
        <StyledButton onClick={() => dispatch(logout())}>로그아웃</StyledButton>
      </div>
    </Container>
  );
}

export default Header;
