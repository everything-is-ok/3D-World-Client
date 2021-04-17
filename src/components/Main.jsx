import React from "react";
import styled from "styled-components";
import MainProfile from "./MainProfile";
import Room from "./Room";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 85vh;
  padding: 2%;
  margin: 1%;

  // NOTE: 사이즈 확인용 border
  border: 2px solid black;
`;

function Main() {
  return (
    <Container>
      <MainProfile />
      <Room />
    </Container>
  );
}

export default Main;
