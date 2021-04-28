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

  const { position, direction } = usePosition(initialPosition);
  const isGuest = user.name === GUEST;

  useEffect(() => {
    function sendUserAvatarInfo({ socketId }) {
      worldSocket.sendOldUserInfo({
        userInfo: {
          ...user,
          position,
          direction,
        },
        listener: socketId,
      });
    }

    worldSocket.listenNewUserSocketId(sendUserAvatarInfo);
  }, []);

  useEffect(() => {
    worldSocket.sendUserMovement({ id, position, direction });
  }, [position]);

  return (
    <>
      <Chicken
        position={position || initialPosition}
        direction={direction}
        name={user.name}
      />
      <ThirdPersonCamera
        position={position}
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
