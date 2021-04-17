import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Photo from "./shared/Photo";
import Name from "./shared/Name";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  // NOTE: 전체 사이즈 확인을 위한 border
  border: 2px solid black;
`;

function MiniProfile({ photo, name }) {
  return (
    <Container>
      <Photo src={photo} />
      <Name name={name} />
    </Container>
  );
}

MiniProfile.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default MiniProfile;
