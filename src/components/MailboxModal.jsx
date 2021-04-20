import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import CustomModal from "./shared/CustomModal";
import MailForm from "./shared/MailForm";
import MailList from "./MailList";
import useMailbox from "../hooks/useMailbox";

// TODO: 일단 중앙에 띄워서 확인하기 위한 컨테이너
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

function MailboxModal({ mailboxId, isMyMailbox, handleClose }) {
  console.log(isMyMailbox);
  const {
    content,
    handleFormSubmit,
    handleInputChange,
    handleDeleteMailItem,
    handleDeleteMailList,
  } = useMailbox();

  function handleSubmit(e) {
    e.preventDefault();
    handleFormSubmit(mailboxId);
    handleClose();
  }

  return (
    <Container>
      <CustomModal handleClose={handleClose}>
        {isMyMailbox ? (
          <MailList
            handleDeleteMailItem={handleDeleteMailItem}
            handleDeleteMailList={handleDeleteMailList}
          />
        ) : (
          <MailForm
            content={content}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleSubmit}
          />
        )}
      </CustomModal>
    </Container>
  );
}

MailboxModal.propTypes = {
  mailboxId: PropTypes.string.isRequired,
  isMyMailbox: PropTypes.element.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default MailboxModal;
