import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch } from "react-redux";

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

function Mailbox({ isMyMailbox, handleClose }) {
  const { handleFormSubmit, handleInputChange } = useMailbox();

  function handleFn() {
    handleClose((prev) => !prev);
  }
  return (
    <Container>
      <CustomModal handleClose={handleFn}>
        {isMyMailbox ? (
          <MailForm
            handleFormSubmit={handleFormSubmit}
          />
        ) : (
          <MailList />
        )}
      </CustomModal>
    </Container>
  );
}

Mailbox.propTypes = {
  isMyMailbox: PropTypes.element.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Mailbox;
