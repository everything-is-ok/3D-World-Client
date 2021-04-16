import React from "react";
import styled from "styled-components";

import StyledButton from "./shared/StyledButton";

const Container = styled.header`
  display: flex;
  align-items: center;
  height: 20px;
  padding: 5px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
`;

function Header() {
  return (
    <Container>
      <StyledButton>월드</StyledButton>
      <StyledButton>홈</StyledButton>
    </Container>
  );
}

export default Header;
