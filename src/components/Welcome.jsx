import React from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { userLogin } from "../reducers/userSlice";
import StyledButton from "./shared/StyledButton";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100%;
  padding: 3em;
`;

function Welcome() {
  const dispatch = useDispatch();

  return (
    <Container>
      <StyledButton onClick={() => dispatch(userLogin())}>
        Google Login
      </StyledButton>
    </Container>
  );
}

export default Welcome;
