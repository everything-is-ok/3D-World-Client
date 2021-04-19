import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Canvas } from "@react-three/fiber";
import useRoom from "../hooks/useRoom";

const Container = styled.div`
  width: 80%;
  height: 100%;

  // NOTE: 사이즈 확인용 border
  border: 2px solid black;
`;

// NOTE: id가 유저의 id인가 room의 id인가?
// TODO: 아주 힘들 예정, 방 정보로 아이템을 배치해야한다.
function Room({ id, isEditable }) {
  const { room } = useRoom(id);

  return (
    room ? (
      <Container>
        {JSON.stringify(room)}
        <Canvas />
        {isEditable && (
          <button type="button">
            리모델링
          </button>
        )}
      </Container>
    ) : (
      // FIXME store 사용 & 로딩컴포넌트
      <h1>
        Loading...
      </h1>
    )
  );
}

Room.propTypes = {
  id: PropTypes.string.isRequired,
  isEditable: PropTypes.bool.isRequired,
};

export default Room;
