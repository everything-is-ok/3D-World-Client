import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import StyledButton from "./StyledButton";

const MailItem = styled.div`
  width: 100%;
  height: 5vh;
  display: flex;
  overflow: hidden;
  border: 1px solid black;
`;

// TODO Mail관련 애들은 Atomic으로 다시 빼도록..
// TODO span 안에 텍스트/ width를 인자로 받도록 분리
const width = css`
  ${(props) => css`
    width: ${props.width}%;
  `}
`;

const MailSpan = styled.span`
  width: ${width};
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ListItem({ mail, handleDelete }) {
  const { _id, sender, content } = mail;

  return (
    <MailItem>
      <MailSpan width="80">
        {content}
      </MailSpan>
      <MailSpan width="20">
        {sender}
      </MailSpan>
      <StyledButton onClick={handleDelete(_id)}>
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
