import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { Canvas, useFrame } from "@react-three/fiber";
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
    useFrame(({ camera }) => {
      camera.lookAt(2 * 40, 0, 2 * 40);
    });

    return null;
  }

  return (
    <Canvas
      orthographic
      camera={{ position: [400, 400, 400], zoom: 0.9 }}
    >
      <Universe
        position={[6 * 40, 0, 6 * 40]}
        radius={400}
      />
      <ambientLight intensity={2} />
      <pointLight position={[7 * 40, 3 * 40, 7 * 40]} />
      <TempModel
        socket={socket}
        name={userName}
        id={userId}
        position={[2 * 40, 24, 0 * 40]}
      />
      <Friends socket={socket} />
      <Suspense fallback={null}>
        <Mailbox
          position={[7 * 40, 7 * 40]}
          onClick={() => handleClickMailbox(room.mailboxId)}
        />
      </Suspense>
      <RoomFurnitures
        socket={socket}
        isEditMode={isEditMode}
        room={room}
      />
      <Suspense fallback={null}>
        <Bedroom
          receiveShadow
          scale={4 * 12}
          position={[0, 20, 0]}
        />
      </Suspense>
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
