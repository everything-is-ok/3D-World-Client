import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useGLTF } from "@react-three/drei";

import Chicken from "./Chicken";
import { worldSocket } from "../../utils/socket";

function OtherUserAvatar({ user }) {
  const {
    position: initialPosition,
    direction: initialDirection,
    name,
  } = user;

  const [position, setPosition] = useState(initialPosition);
  const [direction, setDirection] = useState(initialDirection);

  function updatePosition(userInfo) {
    setPosition([...userInfo.position]);
    setDirection(userInfo.direction);
  }

  useEffect(() => {
    worldSocket.listenUserMovement(user._id, updatePosition);
  }, []);

  return (
    <Chicken
      position={[...position]}
      direction={direction}
      name={name}
    />
  );
}

OtherUserAvatar.propTypes = {
  user: PropTypes.object.isRequired,
};

export default OtherUserAvatar;

useGLTF.preload("models/chicken/scene.gltf");
