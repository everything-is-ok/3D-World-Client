import React from "react";
import PropTypes from "prop-types";

import Floor from "./models/Floor";
import Furniture from "./models/Furniture";
import useFurniture from "../hooks/useFurniture";

function RoomFurnitures({ socket, room, isEditMode }) {
  const {
    items,
    currItemId,
    handleSelectItem,
    handleMoveItem,
  } = useFurniture({ socket, room, isEditMode });

  return (
    <>
      {items && items.map((item) => {
        const { _id, name, position } = item;

        return (
          <Furniture
            key={_id}
            name={name}
            position={position}
            onClick={() => handleSelectItem(_id, position)}
          />
        );
      })}
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
