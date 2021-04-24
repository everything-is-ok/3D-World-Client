import React from "react";
import PropTypes from "prop-types";

import Floor from "./models/Floor";
import Furniture from "./models/Furniture";
import useFurniture from "../hooks/useFurniture";

function RoomFurnitures({ socket, room, isEditMode }) {
  const {
    items,
    handleSelect,
    handleMoveItem,
  } = useFurniture({ socket, room, isEditMode });

  return (
    <>
      {items && items.map((item) => (
        <Furniture
          key={item._id}
          name={item._id}
          position={item.position}
          isEditMode={isEditMode}
          onClick={() => handleSelect(item._id)}
        />
      ))}
      <Floor
        width={12}
        height={12}
        onClick={handleMoveItem}
      />
    </>
  );
}

RoomFurnitures.propTypes = {
  socket: PropTypes.any,
  room: PropTypes.any,
  isEditMode: PropTypes.bool,
};

export default RoomFurnitures;
