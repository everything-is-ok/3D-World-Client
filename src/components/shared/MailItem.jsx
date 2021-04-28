import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import StyledButton from "./StyledButton";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em;

  border: 1px solid black;
`;

const MailContent = styled.div`
  width: 100%;
  height: 100%;
`;

const Buttons = styled.div``;

// TODO 보낸사람 주소 타고 이동하도록 링크만들어야함
function MailItem({
  mail,
  handleDelete,
  handleSelectMail,
}) {
  const {
    sender,
    content,
    status,
    createdAt,
  } = mail;

  return (
    <Container onClick={() => handleSelectMail(mail)}>
      <MailContent>{content}</MailContent>
      <MailContent>{status}</MailContent>
      <MailContent>
        {sender}
      </MailContent>
      <MailContent>{createdAt}</MailContent>
      <Buttons>
        <StyledButton onClick={handleDelete}>
          ❌
        </StyledButton>
      </Buttons>
    </Container>
  );
}

MailItem.propTypes = {
  mail: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleSelectMail: PropTypes.func.isRequired,
};

export default MailItem;
