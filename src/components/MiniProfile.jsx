import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

<<<<<<< HEAD
import Photo from "./shared/Photo";
import Name from "./shared/Name";
=======
import Name from "./shared/Name";
import Photo from "./shared/Photo";
>>>>>>> 4a43d726154bcef751a83d84f4618b34c0886a79

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
<<<<<<< HEAD

=======
  width: fit-content;

  &:hover {
    cursor: pointer;
  }
>>>>>>> 4a43d726154bcef751a83d84f4618b34c0886a79
  // NOTE: 전체 사이즈 확인을 위한 border
  border: 2px solid black;
`;

<<<<<<< HEAD
function MiniProfile({ photo, name }) {
  return (
    <Container>
      <Photo src={photo} />
=======
function MiniProfile({ photoURL, name, onClick }) {
  return (
    <Container onClick={onClick}>
      <Photo
        src={photoURL}
        alt="profile"
        borderRadius="100%"
      />
>>>>>>> 4a43d726154bcef751a83d84f4618b34c0886a79
      <Name name={name} />
    </Container>
  );
}

MiniProfile.propTypes = {
<<<<<<< HEAD
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
=======
  photoURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

MiniProfile.defaultProps = {
  onClick: () => {},
>>>>>>> 4a43d726154bcef751a83d84f4618b34c0886a79
};

export default MiniProfile;
