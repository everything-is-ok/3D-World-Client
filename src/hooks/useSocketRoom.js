import { useEffect } from "react";

function useSocketRoom({
  socket,
  onListenParticipants,
  onListenRoom,
  onListenLeave,
  userId,
  userName,
  roomId,
  position,
  direction,
}) {
  const user = { id: userId, name: userName };

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("participants", onListenParticipants);
  }, [socket, onListenParticipants]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("leave", ({ id, name }) => {
      onListenLeave({ id, name });
    });
  }, [socket, onListenLeave]);

  useEffect(() => {
    if (!socket || !userId || !userName || !roomId) {
      return;
    }

    socket.emit("room", { user, roomId });
  }, [socket, userId, userName, roomId]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    // NOTE: off 해주기 위해 이름이 필요해서 함수선언식 사용.
    // TODO: 적당한 이름있으면 변경
    function cb({ id: i, name, socketId }) {
      onListenRoom({ id: i, name, socketId });

      socket.emit("participants", {
        listener: i,
        posInfo: { user, position, direction },
      });
    }

    socket.on("room", cb);
    return () => socket.off("room", cb);
  }, [socket, onListenRoom, position, direction]);
}

export default useSocketRoom;
