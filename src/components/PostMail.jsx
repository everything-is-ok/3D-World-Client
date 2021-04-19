import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import StyledButton from "./shared/StyledButton";
import CustomModal from "./shared/CustomModal";
import { postMail } from "../reducers/mailSlice";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

function PostMail() {
  const dispatch = useDispatch();

  return (
    <Container>
      <CustomModal>
        <StyledButton onClick={() => dispatch(postMail())}>
          Post Mail
        </StyledButton>
      </CustomModal>
    </Container>
  );
}

export default PostMail;
