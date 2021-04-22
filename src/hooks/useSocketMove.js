import { useEffect } from "react";

function useSocketMove({
  socket,
  position,
  direction,
  onListenMove,
}) {
  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.emit("move", { position, direction });
  }, [position, direction, socket]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("move", onListenMove);
    return () => socket.off("move", onListenMove);
  }, [socket, onListenMove]);
}

export default useSocketMove;
