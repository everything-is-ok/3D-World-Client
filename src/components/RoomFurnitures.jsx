import React from "react";
import PropTypes from "prop-types";

import Floor from "./models/Floor";
import Furniture from "./models/Furniture";
import useFurniture from "../hooks/useFurniture";

function RoomFurnitures({ socket, room, isEditMode }) {
  const {
    items,
    currItemId,
    handleSelect,
    handleMoveItem,
  } = useFurniture({ socket, room, isEditMode });

  return (
    <>
      {items && items.map((item) => (
        <Furniture
          key={item._id}
          name={item.itemName}
          position={item.position}
          onClick={() => handleSelect(item._id, item.position)}
        />
      ))}
      <Floor
        width={12}
        height={12}
        currItemId={currItemId}
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
