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

  function updateItems({ _id, position }) {
    setItems((prev) => prev.map((item) => {
      if (item._id !== _id) {
        return item;
      }

      return { ...item, position };
    }));
  }

  function handleSelectItem(itemId) {
    if (!isEditMode || currItemId === itemId) return;

    setItems((prev) => prev.map((item) => {
      if (item._id !== itemId) {
        return item;
      }

      const [x, y, z] = item.position;

      return { ...item, position: [x, y + 20, z] };
    }));

    setCurrItemId(itemId);
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

      updateItems({ _id: currItemId, position: itemPosition });
      setCurrItemId(null);

      socket.emit("update", { _id: currItemId, position: itemPosition });
    } catch (err) {
      // TODO error handling
      // console.log(err.message);
    }
  }

  useEffect(() => {
    if (!socket) return;

    socket.on("update", updateItems);
    return () => socket.off("update", updateItems);
  }, [socket]);

  return {
    items,
    currItemId,
    handleSelectItem,
    handleMoveItem,
  };
}

export default useFurniture;
