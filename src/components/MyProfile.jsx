import React from "react";
import styled from "styled-components";

import Profile from "./shared/Profile";
import ProfileForm from "./shared/ProfileForm";
import useMyProfile from "../hooks/useMyProfile";

const Container = styled.div`
  width: 20%;
  height: 100%;

  // NOTE: 사이즈 확인용 border
  border: 2px solid black;
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