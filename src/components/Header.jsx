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
      {/* TODO: 월드, 홈 버튼은 토글방식으로 컴포넌트 분리 */}
      <StyledButton>월드</StyledButton>
      <StyledButton>홈</StyledButton>

      {/* TODO: photo url만 전달할지, alt 등 추가 정보 결정 */}
      <MiniProfile
        photo="photo"
        name="name"
      />

      {/* TODO: 로그아웃 기능 추가 */}
      <StyledButton>로그아웃</StyledButton>
    </Container>
  );
}

export default Header;
