import React from "react";
import styled from "styled-components";

import Profile from "./shared/Profile";
import ProfileForm from "./shared/ProfileForm";
import useMyProfile from "../hooks/useMyProfile";

const Container = styled.div`
  height: 100%;
  padding: 0.5rem;
`;

// NOTE: rename options: editable profile & readonly profile?
function MyProfile() {
  const {
    userData,
    isEditing,
    setIsEditing,
    handleFormSubmit,
    handleInputChange,
  } = useMyProfile();

  return (
    <Container>
      {isEditing ? (
        <ProfileForm
          name={userData.name}
          description={userData.description}
          photoURL={userData.photoURL}
          musicURL={userData.musicURL}
          handleInputChange={handleInputChange}
          handleSubmit={handleFormSubmit}
        />
      ) : (
        <>
          <Profile
            name={userData.name}
            description={userData.description}
            photoURL={userData.photoURL}
            musicURL={userData.musicURL}
          />
          <button
            type="button"
            onClick={() => setIsEditing(true)}
          >
            EDIT
          </button>
        </>
      )}

    </Container>
  );
}

export default MyProfile;
