import React, { useEffect } from "react";
import PropTypes from "prop-types";

import Chicken from "./Chicken";
import usePosition from "../../hooks/usePosition";
import { worldSocket } from "../../utils/socket";
import ThirdPersonCamera from "../ThirdPersonCamera";

const GUEST = "guest";

function UserAvatar({ ...props }) {
  const { position: initialPosition, user } = props;
  const { _id: id } = user;

  const isGuest = user.name === GUEST;
  const { positionRef, directionRef } = usePosition(initialPosition, 0, handleMovementChange, !isGuest);

  useEffect(() => {
    if (isGuest) {
      return;
    }

    function sendUserAvatarInfo({ socketId }) {
      worldSocket.sendOldUserInfo({
        userInfo: {
          ...user,
          position: positionRef.current,
          direction: directionRef.current,
        },
        receiver: socketId,
      });
    }

    worldSocket.listenNewUserSocketId(sendUserAvatarInfo);
  }, [user]);

  function handleMovementChange() {
    worldSocket.sendUserMovement({
      id,
      position: positionRef.current,
      direction: directionRef.current,
    });
  }

  return (
    <>
      <Chicken
        positionRef={positionRef}
        directionRef={directionRef}
        name={user.name}
      />
      <ThirdPersonCamera
        positionRef={positionRef}
        hasLimit={isGuest}
        handleCameraStop={isGuest && props.handleCameraStop}
      />
    </>
  );
}

UserAvatar.propTypes = {
  position: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  handleCameraStop: PropTypes.func,
};

export default UserAvatar;
