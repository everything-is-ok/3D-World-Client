import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

import { userSelector } from "../reducers/userSlice";

const URL = process.env.REACT_APP_SERVER_URL;

// NOTE: component mount에 한번 연결, unmount에 disconnect
function useSocket(roomId) {
  const [socket, setSocket] = useState(null);
  const user = useSelector(userSelector);

  useEffect(() => {
    const connection = io(URL);

    setSocket(connection);
    return () => connection.disconnect();
  }, [setSocket]);

  useEffect(() => {
    if (!socket || !user || !roomId) {
      return;
    }

    socket.on("room", ({ name }) => console.log(`${name} is join!`));
    socket.emit("room", { user, roomId });
  }, [socket, user, roomId]);

  return socket;
}

export default useSocket;
