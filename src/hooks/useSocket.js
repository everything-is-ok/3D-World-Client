import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

import { userIdSelector } from "../reducers/userSlice";

const URL = process.env.REACT_APP_SERVER_URL;

// NOTE: component mount에 한번 연결, unmount에 disconnect
function useSocket(roomId) {
  const [socket, setSocket] = useState(null);
  const userId = useSelector(userIdSelector);

  useEffect(() => {
    const connection = io(URL);

    setSocket(connection);
    return () => connection.disconnect();
  }, [setSocket]);

  useEffect(() => {
    if (!socket || !userId || !roomId) {
      return;
    }

    socket.on("room", ({ name }) => console.log(`${name} is join!`));
    socket.emit("room", { userId, roomId });
  }, [socket, userId, roomId]);

  return socket;
}

export default useSocket;
