import React from "react";
import styled from "styled-components";

import MiniProfile from "./MiniProfile";
import StyledButton from "./shared/StyledButton";

const Container = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 10vh;
  padding: 1%;
  border-bottom: 2px solid black;
`;

function Header() {
  return (
    <Container>
      <StyledButton>월드</StyledButton>
      <StyledButton>홈</StyledButton>
      <MiniProfile
        photo="photo"
        name="name"
      />
      <StyledButton>로그아웃</StyledButton>
    </Container>
  );
}

export default Header;
