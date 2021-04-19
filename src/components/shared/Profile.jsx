import ReactAudioPlayer from "react-audio-player";

import React from "react";
import PropTypes from "prop-types";
import Photo from "./Photo";

function Profile({
  name,
  description,
  photoURL,
  musicURL,
}) {
  return (
    <>
      <h3>{name}</h3>
      <div>{description}</div>
      <Photo size={200} src={photoURL} alt="profilePhoto" />
      <ReactAudioPlayer
        src={musicURL}
        crossOrigin="anonymous"
        autoPlay
        controls
      />
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
