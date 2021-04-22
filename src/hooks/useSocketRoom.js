import { useEffect } from "react";

function useSocketRoom({
  socket,
  onListenParticipants,
  onListenRoom,
  userId,
  userName,
  roomId,
  position,
  direction,
}) {
  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("participants", onListenParticipants);
  }, [socket, onListenParticipants]);

  useEffect(() => {
    if (!socket || !userId || !userName || !roomId) {
      return;
    }

    socket.emit("room", { user: { id: userId, name: userName }, roomId });
  }, [socket, userId, userName, roomId]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("room", ({ id: i, name, socketId }) => {
      onListenRoom({ id: i, name, socketId });

      socket.emit("participants", {
        listener: i,
        posInfo: { user: { id: userId, name: userName }, position, direction },
      });
    });
  }, [socket]);
}

export default useSocketRoom;
