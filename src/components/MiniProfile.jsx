import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Photo from "./shared/Photo";
import Name from "./shared/Name";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: fit-content;

  &:hover {
    cursor: pointer;
  }
  // NOTE: 전체 사이즈 확인을 위한 border
  border: 2px solid black;
`;

function MiniProfile({ photoURL, name, onClick }) {
  return (
    <Container onClick={onClick}>
      <Photo
        src={photoURL}
        alt="profile"
        borderRadius="100%"
      />
      <Name name={name} />
    </Container>
  );
}

MiniProfile.propTypes = {
  photoURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

MiniProfile.defaultProps = {
  onClick: () => {},
};

export default MiniProfile;
