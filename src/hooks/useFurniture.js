import { useEffect, useState } from "react";

import fetchData from "../utils/fetchData";

function useFurniture({
  socket,
  room,
  isEditMode,
}) {
  const [furniture, setFurniture] = useState(room?.furniture);
  const [currFurnitureId, setCurrFurnitureId] = useState(null);

  useEffect(() => {
    setFurniture(room?.furniture);
  }, [room]);

  function updateFurniture({ _id, position }) {
    setFurniture((prev) => prev.map((elem) => {
      if (elem._id !== _id) {
        return elem;
      }

      return { ...elem, position };
    }));
  }

  function handleFurnitureSelect(furnitureId) {
    if (!isEditMode || currFurnitureId === furnitureId) return;

    setFurniture((prev) => prev.map((elem) => {
      if (elem._id !== furnitureId) {
        return elem;
      }

      const [x, y, z] = elem.position;

      return { ...elem, position: [x, y + 20, z] };
    }));

    setCurrFurnitureId(furnitureId);
  }

  async function handleFurnitureMove(x, y) {
    if (!currFurnitureId || !isEditMode) return;

    const height = furniture.find((elem) => elem._id === currFurnitureId).position[1];
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
    furniture,
    currFurnitureId,
    handleFurnitureSelect,
    handleFurnitureMove,
  };
}

export default useFurniture;
