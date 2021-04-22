import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import StyledButton from "./StyledButton";
import useModal from "../../hooks/useModal";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em;

  border: 1px solid black;
`;

const MailSpan = styled.span`
`;

const MailDetail = styled.div`
  position: fixed;
  width: 40vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3vw;

  border: 1px solid black;
`;

const MailContent = styled.div`
  width: 100%;
  height: 100%;
`;

const MailSender = styled.div`
  width: 100%;
  height: 100%;

  border: 1px solid black;
`;

const Buttons = styled.div``;

// TODO 보낸사람 주소 타고 이동하도록 링크만들어야함
// TODO modalOpen 상태일 때 신규메일임을 표현(3순위)
// TODO 메일 한개 클릭 시 read PATCH
function MailItem({ mail, handleDelete }) {
  const { modalOpen, toggle } = useModal(false);
  const { _id, sender, content } = mail;

  return (
    <Container onClick={toggle}>
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
        <>
          <MailSpan>{content}</MailSpan>
          <MailSpan>{sender}</MailSpan>
          <StyledButton onClick={() => handleDelete(_id)}>
            ❌
          </StyledButton>
        </>
      )}
    </Container>
  );
}

MailItem.propTypes = {
  mail: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default MailItem;
