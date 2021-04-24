import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import MailItem from "./shared/MailItem";
import StyledButton from "./shared/StyledButton";
import useMailList from "../hooks/useMailList";

const Container = styled.div`
`;

const Content = styled.div`
`;

function MailboxList({ toggle }) {
  const {
    mailList,
    isDetail,
    selectedMail,
    handleClose,
    handleSelectMail,
    handleDeleteMailItem,
    handleDeleteMailList,
  } = useMailList();

  return (
    <Container>
      {isDetail ? (
        <>
          <Content>{selectedMail.content}</Content>
          <Content>{selectedMail.sender}</Content>
          <Content>{selectedMail._id}</Content>
          <Content>{selectedMail.createdAt}</Content>
          <Content>READ</Content>
          <StyledButton onClick={handleDeleteMailItem}>
            삭제
          </StyledButton>
          <StyledButton onClick={handleClose}>
            확인
          </StyledButton>
        </>
      ) : (
        <>
          {mailList
            && mailList.mails.map((mail) => (
              <MailItem
                key={mail._id}
                mail={mail}
                handleClose={handleClose}
                handleSelectMail={() => handleSelectMail(mail)}
                handleDelete={handleDeleteMailItem}
              />
            ))}
          <StyledButton onClick={handleDeleteMailList}>
            Delete All
          </StyledButton>
          <StyledButton onClick={toggle}>
            Close
          </StyledButton>
        </>
      )}
    </Container>
  );
}

MailboxList.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default MailboxList;
