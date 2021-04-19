import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Canvas } from "@react-three/fiber";

import useModal from "../hooks/useModal";
import MailList from "./MailList";

const Container = styled.div`
  width: 700px;
  height: 500px;

  // NOTE: 사이즈 확인용 border
  border: 2px solid black;
`;

// NOTE: id가 유저의 id인가 room의 id인가?
// TODO: 아주 힘들 예정, 방 정보로 아이템을 배치해야한다.
function Room({ id }) {
  const { modalOpen, toggle } = useModal(true);
  return (
    <Container>
      {modalOpen && <MailList handleClick={toggle}>Mail</MailList>}
      <Canvas />
    </Container>
  );
}

Room.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Room;
