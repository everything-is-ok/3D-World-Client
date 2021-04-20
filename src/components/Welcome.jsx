import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";

import StyledButton from "./shared/StyledButton";
import { userLogin } from "../reducers/userSlice";

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
  const history = useHistory();

  async function handleClick() {
    const actionResult = await dispatch(userLogin());

    try {
      const user = unwrapResult(actionResult);

      history.push(`/room/${user._id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      <StyledButton onClick={handleClick}>
        Google Login
      </StyledButton>
    </Container>
  );
}

export default Welcome;
