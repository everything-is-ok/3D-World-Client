import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Name from "./shared/Name";
import Photo from "./shared/Photo";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: fit-content;

  &:hover {
    cursor: pointer;
  }
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
