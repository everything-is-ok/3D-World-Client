import { useEffect, useState } from "react";

function useSocketItemMove({
  socket,
  isEditMode,
  onItemMove,
}) {
  // edit start event
  // useEffect(() => {
  //   if (!socket && !isEditMode) {
  //     return;
  //   }

  //   socket.emit("edit", onItemMove);
  // }, [socket, isEditMode]);

  useEffect(() => {
    if (!socket && !isEditMode) {
      return;
    }

    socket.emit("update", onItemMove);
  }, [socket, isEditMode]);

  useEffect(() => {
    if (!socket && !isEditMode) {
      return;
    }

    socket.on("update", onItemMove);
    return () => socket.off("update", onItemMove);
  }, [socket, onItemMove]);
}

export default useSocketItemMove;
