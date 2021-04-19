import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import StyledButton from "./StyledButton";

const MailItem = styled.li`
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

function ListItem({ mail, handleDelete }) {
  const { _id, sender, content } = mail;

  return (
    <MailItem>
      <MailSpan>{content}</MailSpan>
      <MailSpan>{sender}</MailSpan>
      <StyledButton onClick={() => handleDelete(_id)}>
        ❌
      </StyledButton>
    </MailItem>
  );
}

ListItem.propTypes = {
  mail: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ListItem;
