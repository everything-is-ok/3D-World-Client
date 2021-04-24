import { useEffect, useState } from "react";

import fetchData from "../utils/fetchData";

function useMailList({
  socket,
  room,
  isEditMode,
}) {
  const [items, setItems] = useState(room?.items);
  const [currItemId, setCurrItemId] = useState(null);

  useEffect(() => {
    setItems(room?.items);
  }, [room]);

  function handleSelect(itemId) {
    if (!isEditMode || currItemId === itemId) return;

    setCurrItemId(itemId);
  }

  function updateMoveItem({ _id, position }) {
    setItems((prev) => prev.map((item) => {
      if (item._id !== _id) {
        return item;
      }

      return { _id, position };
    }));
  }

  async function handleMoveItem(x, y) {
    if (!currItemId || !isEditMode) return;

    const itemPosition = [(x * 40), 10, (y * 40)];

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
    handleSelect,
    handleMoveItem,
  };
}

export default useMailList;
