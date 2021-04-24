import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Universe from "./models/Universe";
import TempModel from "./models/TempModel";
import Mailbox from "./models/Mailbox";
import Floor from "./models/Floor";
import Bedroom from "./models/Bedroom";
import Friends from "./Friends";
import Furniture from "./models/Furniture";
import fetchData from "../utils/fetchData";

function RoomCanvas({
  socket,
  userId,
  userName,
  room,
  handleClickMailbox,
  isEditMode,
}) {
  const [items, setItems] = useState([]);
  const [currItemId, setCurrItemId] = useState(null);

  useEffect(() => {
    setItems(room?.items);
  }, [room]);

  function handleSelect(itemId) {
    if (!isEditMode) return;

    setCurrItemId(itemId);
  }

  function updateMoveItem({ _id, position }) {
    setItems((prev) => prev.map((item) => {
      if (item._id !== _id) {
        return item;
      }

      return { _id, position };
    }));
  }

  async function handleMoveItem(x, y) {
    if (!currItemId || !isEditMode) return;

    const itemPosition = [x * 40, 24, y * 40];

    try {
      await fetchData(
        "PATCH",
        "/item",
        { id: currItemId, position: itemPosition },
      );

      updateMoveItem({ _id: currItemId, position: itemPosition });

      socket.emit("update", { _id: currItemId, position: itemPosition });
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    if (!socket) return;

    socket.on("update", updateMoveItem);
    return () => socket.off("update", updateMoveItem);
  }, [socket]);

  function ControlCam() {
    // useFrame(({ camera }) => {
    //   camera.lookAt([6 * 40, 0, 6 * 40]);
    // });

    return null;
  }

  return (
    <Canvas orthographic camera={{ position: [300, 300, 300], fov: 80, near: 10 }}>
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
      {room && items
          && items.map((item) => (
            <Furniture
              key={`${item._id}${Math.random(20)}`}
              id={item._id}
              name={item._id}
              position={item.position}
              isEditMode={isEditMode}
              onClick={() => handleSelect(item._id)}
            />
          ))}
      <Mailbox
        position={[7 * 40, 7 * 40]}
        onClick={() => handleClickMailbox(room.mailboxId)}
      />
      <Floor
        width={12}
        height={12}
        onClick={handleMoveItem}
      />
      <Bedroom receiveShadow scale={4 * 12} position={[0, 20, 0]} />
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
