import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useFrame } from "@react-three/fiber";

import Chicken from "./Chicken";
import PugHead from "./PugHead";
import usePosition from "../../hooks/usePosition";
import { worldSocket } from "../../utils/socket";
import getThridPersonCameraPosition from "../ThridPersonCamera";

function UserAvatar({ ...props }) {
  const { position: initialPosition, user } = props;
  const { _id: id } = user;

  const { position, direction } = usePosition(initialPosition);

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

  function ThirdPersonCamera({ camPosition }) {
    const vec = getThridPersonCameraPosition(camPosition);

    useFrame(({ camera }) => {
      if (user.name === "guest" && vec.z <= -6000) {
        props.handleCameraStop();

        return;
      }

      camera.position.lerp(vec, 0.1);
    });

    return null;
  }

  return (
    <>
      <Chicken
        position={position || initialPosition}
        direction={direction}
        name={user.name}
      />
      <ThirdPersonCamera camPosition={position} />
      {/* <PugHead
        position={position || initialPosition}
        direction={direction}
      /> */}
    </>
  );
}

UserAvatar.propTypes = {
  position: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  handleCameraStop: PropTypes.func,
};

export default UserAvatar;
