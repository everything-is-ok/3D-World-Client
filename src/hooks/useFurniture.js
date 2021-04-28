import { useEffect, useState } from "react";

import fetchData from "../utils/fetchData";

function useFurniture({
  socket,
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

    const height = furnitures.find((furniture) => furniture._id === currentFurnitureId).position[1];
    const furniturePosition = [(x * 40), height - 20, (y * 40)];

    try {
      await fetchData(
        "PATCH",
        "/furniture",
        { id: currentFurnitureId, position: furniturePosition },
      );

      updateFurniture({ _id: currentFurnitureId, position: furniturePosition });
      setCurrentFurnitureId(null);

      socket.emit("update", { _id: currentFurnitureId, position: furniturePosition });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  useEffect(() => {
    if (!socket) return;

    socket.on("update", updateFurniture);
    return () => socket.off("update", updateFurniture);
  }, [socket]);

  return {
    furnitures,
    currentFurnitureId,
    handleFurnitureSelect,
    handleFurnitureMove,
  };
}

export default useFurniture;
