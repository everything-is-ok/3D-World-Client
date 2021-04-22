import { useEffect, useState } from "react";
import io from "socket.io-client";

const URL = process.env.REACT_APP_SERVER_URL;

// NOTE: component mount에 한번 연결, unmount에 disconnect
function useSocket(roomId, userId, userName) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const connection = io(URL);

    setSocket(connection);
    return () => connection.disconnect();
  }, [setSocket]);

  useEffect(() => {
    if (!socket || !userId || !userName || !roomId) {
      return;
    }

    socket.emit("room", { user: { id: userId, name: userName }, roomId });
  }, [socket, userId, userName, roomId]);

  return socket;
}

export default useSocket;
