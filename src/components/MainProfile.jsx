import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 200px;
  height: 500px;

  // NOTE: 사이즈 확인용 border
  border: 2px solid black;
`;

function MainProfile() {
  return (
    <Container />
  );
}

export default MainProfile;
