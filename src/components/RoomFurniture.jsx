import React from "react";
import PropTypes from "prop-types";

import Floor from "./models/Floor";
import Furniture from "./models/Furniture";
import useFurniture from "../hooks/useFurniture";

function RoomFurniture({ socket, room, isEditMode }) {
  const {
    furnitures,
    currFurnitureId,
    handleFurnitureSelect,
    handleFurnitureMove,
  } = useFurniture({ socket, room, isEditMode });

  return (
    <>
      {furnitures && furnitures.map((furniture) => {
        const { _id, name, position } = furniture;

        return (
          <Furniture
            key={_id}
            name={name}
            position={position}
            onClick={() => handleFurnitureSelect(_id, position)}
          />
        );
      })}
      <Floor
        width={12}
        height={12}
        currFurnitureId={currFurnitureId}
        onClick={handleFurnitureMove}
      />
    </>
  );
}

RoomFurniture.propTypes = {
  socket: PropTypes.any,
  room: PropTypes.any,
  isEditMode: PropTypes.bool,
};

export default RoomFurniture;
