import { useEffect, useState } from "react";

import fetchData from "../utils/fetchData";
import checkArea from "../utils/checkArea";
import { furnitureSocket } from "../utils/socket";

function useFurniture({
  isSocketReady,
  room,
  isEditMode,
}) {
  const [furnitures, setFurnitures] = useState(room?.furniture);
  const [currentFurnitureId, setCurrentFurnitureId] = useState(null);

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
    if (!isEditMode || currentFurnitureId === furnitureId) return;

    setFurnitures((prev) => prev.map((furniture) => {
      if (furniture._id !== furnitureId) {
        return furniture;
      }

      const [x, y, z] = furniture.position;

      return { ...furniture, position: [x, y + 20, z] };
    }));

    setCurrentFurnitureId(furnitureId);
  }

  async function handleFurnitureMove(x, y) {
    if (!currentFurnitureId || !isEditMode) return;

    const area = checkArea(x, y);

    if (area.isOccupied) {
      return;
    }

    const height = furnitures.find((furniture) => furniture._id === currentFurnitureId).position[1];
    const furniturePosition = [(x * 40), height - 20, (y * 40)];
    const changedFurniture = { _id: currentFurnitureId, position: furniturePosition };

    try {
      await fetchData(
        "PATCH",
        "/furniture",
        changedFurniture,
      );

      updateFurniture(changedFurniture);
      setCurrentFurnitureId(null);

      furnitureSocket.sendUpdatedFurniture(changedFurniture);
    } catch (err) {
      // TODO error handling
      // console.log(err.message);
    }
  }

  useEffect(() => {
    if (!isSocketReady) return;

    furnitureSocket.listenFurnitureMovement(updateFurniture);
  }, [isSocketReady]);

  return {
    furnitures,
    currentFurnitureId,
    handleFurnitureSelect,
    handleFurnitureMove,
  };
}

export default useFurniture;
