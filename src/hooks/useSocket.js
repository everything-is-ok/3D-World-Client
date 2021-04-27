import { useEffect, useState } from "react";
import io from "socket.io-client";

const URL = process.env.REACT_APP_SERVER_URL;
const connection = io(URL);

// NOTE: component mount에 한번 연결, unmount에 disconnect
function useSocket(userId) {
  const [socket, setSocket] = useState(connection);

  useEffect(() => {
    console.log("connect");
    return () => socket.disconnect();
  }, [userId]);

  return socket;
}

export default useSocket;
