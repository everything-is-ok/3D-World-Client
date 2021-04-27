import { useEffect, useState } from "react";

import fetchData from "../utils/fetchData";
import checkArea from "../utils/checkArea";

function useFurniture({
  socket,
  room,
  isEditMode,
}) {
  const [furnitures, setFurnitures] = useState(room?.furniture);
  const [currFurnitureId, setCurrFurnitureId] = useState(null);

  useEffect(() => {
    setFurnitures(room?.furniture);
  }, [room]);

  function updateFurniture({ _id, position }) {
    setFurnitures((prev) => prev.map((furniture) => {
      if (furniture._id !== _id) {
        return furniture;
      }

      return { ...furniture, position };
    }));
  }

  function handleFurnitureSelect(furnitureId) {
    if (!isEditMode || currFurnitureId === furnitureId) return;

    setFurnitures((prev) => prev.map((furniture) => {
      if (furniture._id !== furnitureId) {
        return furniture;
      }

      const [x, y, z] = furniture.position;

      return { ...furniture, position: [x, y + 20, z] };
    }));

    setCurrFurnitureId(furnitureId);
  }

  async function handleFurnitureMove(x, y) {
    if (!currFurnitureId || !isEditMode) return;

    const area = checkArea(x, y);

    if (area.isOccupied) {
      return;
    }

    const height = furnitures.find((furniture) => furniture._id === currFurnitureId).position[1];
    const furniturePosition = [(x * 40), height - 20, (y * 40)];

    try {
      await fetchData(
        "PATCH",
        "/furniture",
        { id: currFurnitureId, position: furniturePosition },
      );

      updateFurniture({ _id: currFurnitureId, position: furniturePosition });
      setCurrFurnitureId(null);

      socket.emit("update", { _id: currFurnitureId, position: furniturePosition });
    } catch (err) {
      // TODO error handling
      // console.log(err.message);
    }
  }

  useEffect(() => {
    if (!socket) return;

    socket.on("update", updateFurniture);
    return () => socket.off("update", updateFurniture);
  }, [socket]);

  return {
    furnitures,
    currFurnitureId,
    handleFurnitureSelect,
    handleFurnitureMove,
  };
}

export default useFurniture;
