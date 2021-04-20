import { useEffect, useState } from "react";
import io from "socket.io-client";

const URL = process.env.REACT_APP_SERVER_URL;

// NOTE: 로그인한 user id와 접속하고자 하는 방의 id
function useSocket(userId, roomId) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!userId || !roomId) {
      return;
    }

    const connection = io(URL);

    connection.emit("visit", { user: userId, room: roomId });

    setSocket(connection);
    return () => connection.disconnect({ user: userId, room: roomId });
  }, [userId, roomId, setSocket]);

  return socket;
}

export default useSocket;
