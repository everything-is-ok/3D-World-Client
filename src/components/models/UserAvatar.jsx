import React, { useEffect } from "react";
import PropTypes from "prop-types";

import Chicken from "./Chicken";
import usePosition from "../../hooks/usePosition";
import { worldSocket } from "../../utils/socket";
import ThirdPersonCamera from "../ThirdPersonCamera";

const GUEST = "guest";
//  TODO: 월드 포지션 확인
//     positionRef,
//     directionRef,
//     handlePositionChange,
//     initPosition,
function UserAvatar({ ...props }) {
  const { position: initialPosition, user } = props;
  const { _id: id } = user;

  const { positionRef, directionRef } = usePosition(initialPosition, 0, handleMovementChange);
  const isGuest = user.name === GUEST;

  useEffect(() => {
    if (!isGuest) {
      return;
    }

    function sendUserAvatarInfo({ socketId }) {
      worldSocket.sendOldUserInfo({
        userInfo: {
          ...user,
          position: positionRef.current,
          direction: directionRef.current,
        },
        listener: socketId,
      });
    }

    worldSocket.listenNewUserSocketId(sendUserAvatarInfo);
  }, []);

  function handleMovementChange() {
    worldSocket.sendUserMovement({
      id,
      position: positionRef.current,
      direction: positionRef.current,
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
