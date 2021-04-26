import React from "react";
import PropTypes from "prop-types";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Universe from "./models/Universe";
import TempModel from "./models/TempModel";
import Mailbox from "./models/Mailbox";
import Bedroom from "./models/Bedroom";
import Friends from "./Friends";
import RoomFurnitures from "./RoomFurnitures";

function RoomCanvas({
  socket,
  userId,
  userName,
  room,
  handleClickMailbox,
  isEditMode,
}) {
  function ControlCam() {
    // useFrame(({ camera }) => {
    //   camera.lookAt([6 * 40, 0, 6 * 40]);
    // });

    return null;
  }

  return (
    <Canvas
      orthographic
      camera={{ position: [300, 300, 300], fov: 80, near: 10 }}
    >
      <Universe
        position={[6 * 40, 0, 6 * 40]}
        radius={400}
      />
      <ambientLight intensity={2} />
      <pointLight position={[40, 40, 40]} />
      <TempModel
        socket={socket}
        name={userName}
        id={userId}
        position={[2 * 40, 24, 0 * 40]}
      />
      <Friends socket={socket} />
      <Mailbox
        position={[7 * 40, 7 * 40]}
        onClick={() => handleClickMailbox(room.mailboxId)}
      />
      {/* NOTE 조건확인 */}
      <RoomFurnitures
        socket={socket}
        isEditMode={isEditMode}
        room={room}
      />
      <Bedroom
        receiveShadow
        scale={4 * 12}
        position={[0, 20, 0]}
      />
      {/* NOTE: OrbitControls 삭제하고 view 고정해야함 */}
      <OrbitControls />
      <ControlCam />
    </Canvas>
  );
}

RoomCanvas.propTypes = {
  socket: PropTypes.any,
  userId: PropTypes.string,
  userName: PropTypes.string,
  room: PropTypes.any,
  handleClickMailbox: PropTypes.func,
  isEditMode: PropTypes.bool,
};

export default RoomCanvas;
