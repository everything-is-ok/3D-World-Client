import React from "react";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";

import Photo from "./Photo";
import StyledButton from "./StyledButton";
import useAudio from "../../hooks/useAudio";

function Profile({
  name,
  description,
  photoURL,
  musicURL,
}) {
  const { isPlaying, playAudio } = useAudio();

  return (
    <>
      <h3>{name}</h3>
      <div>{description}</div>
      <Photo size={200} src={photoURL} alt="profilePhoto" />
      <ReactPlayer
        url={musicURL}
        playing={isPlaying}
        width="0"
        height="0"
        controls
      />
      <StyledButton type="button" onClick={playAudio}>
        play
      </StyledButton>
    </>
  );
}

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  photoURL: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  musicURL: PropTypes.string.isRequired,
};

export default Profile;
