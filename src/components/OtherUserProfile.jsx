import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Profile from "./shared/Profile";
import useOtherUserProfile from "../hooks/useOtherUserProfile";

const Container = styled.div`
  width: 20%;
  height: 100%;

  // NOTE: 사이즈 확인용 border
  border: 2px solid black;
`;

// TODO: RENAME options: read-only-profile / editable-profile
function OtherUserProfile({ id }) {
  const { userData } = useOtherUserProfile(id);

  console.log("🍕", userData, id);

  return (
    <Container>
      <Profile
        name={userData.name}
        description={userData.description}
        photoURL={userData.photoURL}
        musicURL={userData.musicURL}
      />
    </Container>
  );
}

OtherUserProfile.propTypes = {
  id: PropTypes.string.isRequired,
};

export default OtherUserProfile;
