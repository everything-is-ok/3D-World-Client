import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import StyledButton from "./StyledButton";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5%;
  padding: 0.3em;
  background-color: #f8f5f5;
  margin-bottom: 1vh;
`;

const MailStatus = styled.div`
  flex-basis: 10%;
  font-size: 0.5em;
  background-color: white;
  padding: 1em;
`;

const MailContent = styled.div`
  flex-basis: 60%;
  width: 100%;
  height: 100%;
  margin-left: 2vw;
`;

const MailDate = styled.div`
  flex-basis: 20%;
  font-size: 0.6em;
  color: gray;
`;

const MailButton = styled(StyledButton)`
`;

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

  const date = new Date(createdAt).toISOString();

  return (
    <Container onClick={() => handleSelectMail(mail)}>
      <MailStatus>{status}</MailStatus>
      <MailContent>{content}</MailContent>
      <MailDate>{date.substring(0, 10)}</MailDate>
      <MailButton onClick={handleDelete}>
        ❌
      </MailButton>
    </Container>
  );
}

MailItem.propTypes = {
  mail: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleSelectMail: PropTypes.func.isRequired,
};

export default MailItem;
