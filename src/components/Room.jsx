import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Canvas } from "@react-three/fiber";

import MailList from "./MailList";
import MailForm from "./shared/MailForm";
import { roomUserSelector } from "../reducers/roomSlice";
import StyledButton from "./shared/StyledButton";
import useMailbox from "../hooks/useMailbox";

const Container = styled.div`
  width: 80%;
  height: 100%;

  // NOTE: 사이즈 확인용 border
  border: 2px solid black;
`;

// NOTE: id가 유저의 id인가 room의 id인가?
// TODO: 아주 힘들 예정, 방 정보로 아이템을 배치해야한다.
function Room({ id }) {
  const [modalOpen, setModalOpen] = useState(false);
  const isMyRoom = useSelector(roomUserSelector);

  const { handleFormSubmit, handleInputChange, handleDeleteMailList } = useMailbox();

  function toggle() {
    setModalOpen((prev) => !prev);
  }

  return (
    <Container>
      <StyledButton onClick={toggle}>
        Mail
      </StyledButton>
      {modalOpen && isMyRoom ? (
        <MailList handleDeleteMailList={handleDeleteMailList}>
          Mail
        </MailList>
      ) : (
        <MailForm
          handleFormSubmit={handleFormSubmit}
          handleInputChange={handleInputChange}
        />
      )}
      {/* <Canvas /> */}
    </Container>
  );
}

Room.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Room;
