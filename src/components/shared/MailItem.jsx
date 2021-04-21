import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import StyledButton from "./StyledButton";
import useModal from "../../hooks/useModal";

const Container = styled.div`
`;

const MailContainer = styled.li`
  width: 100%;
  height: 5vh;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  border: 1px solid black;
`;

const MailSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MailDetail = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  pointer-events: auto;
  min-width: 500px;
  min-height: 500px;
  max-width: 100%;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
  padding: 2rem;
`;

const MailContent = styled.div`
  width: 100%;
  height: 100%;
`;

const MailSender = styled.div`
  width: 100%;
  height: 100%;
`;

const Buttons = styled.div`
`;

// TODO 보낸사람 주소 타고 이동하도록 링크만들어야함
function MailItem({ mail, handleDelete }) {
  const { modalOpen, toggle } = useModal();
  const { _id, sender, content } = mail;

  function handleClick(e) {
    console.log(e.currentTarget);
    console.log(e.target);
  }

  return (
    <Container>
      {modalOpen ? (
        <MailDetail>
          <MailContent>{content}</MailContent>
          <MailSender>{sender}</MailSender>
          <Buttons>
            <StyledButton onClick={() => handleDelete(_id)}>
              ❌
            </StyledButton>
            <StyledButton onClick={toggle}>
              ⬅️
            </StyledButton>
          </Buttons>
        </MailDetail>
      ) : (
        <MailContainer onClick={handleClick}>
          <MailSpan>{content}</MailSpan>
          <MailSpan>{sender}</MailSpan>
          <StyledButton onClick={handleClick}>
            ❌
          </StyledButton>
        </MailContainer>
      )}
    </Container>
  );
}

MailItem.propTypes = {
  mail: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default MailItem;
