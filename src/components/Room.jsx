import React from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";

const Container = styled.div`
  width: 700px;
  height: 500px;

  // NOTE: 사이즈 확인용 border
  border: 2px solid black;
`;

function Room() {
  return (
    <Container>
      <Canvas />
    </Container>
  );
}

export default Room;
