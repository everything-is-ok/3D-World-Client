import { useEffect, useState } from "react";

import fetchData from "../utils/fetchData";

function useFurniture({
  socket,
  room,
  isEditMode,
}) {
  const [items, setItems] = useState(room?.items);
  const [currItemId, setCurrItemId] = useState(null);

  useEffect(() => {
    setItems(room?.items);
  }, [room]);

  function handleSelect(itemId, itemPosition) {
    if (!isEditMode || currItemId === itemId) return;

    const [x, y, z] = itemPosition;

    setItems((prev) => prev.map((item) => {
      if (item._id !== itemId) {
        return item;
      }

      return { ...item, position: [x, y + 20, z] };
    }));

    setCurrItemId(itemId);
  }

  function updateMoveItem({ _id, position }) {
    setItems((prev) => prev.map((item) => {
      if (item._id !== _id) {
        return item;
      }

      return { ...item, position };
    }));
  }

  async function handleMoveItem(x, y) {
    if (!currItemId || !isEditMode) return;

    const height = items.find((item) => item._id === currItemId).position[1];
    const itemPosition = [(x * 40), height - 20, (y * 40)];

    try {
      await fetchData(
        "PATCH",
        "/item",
        { id: currItemId, position: itemPosition },
      );

      updateMoveItem({ _id: currItemId, position: itemPosition });
      setCurrItemId(null);

      socket.emit("update", { _id: currItemId, position: itemPosition });
    } catch (err) {
      // TODO error handling
      // console.log(err.message);
    }
  }

  useEffect(() => {
    if (!socket) return;

    socket.on("update", updateMoveItem);
    return () => socket.off("update", updateMoveItem);
  }, [socket]);

  return {
    items,
    currItemId,
    handleSelect,
    handleMoveItem,
  };
}

export default useFurniture;
