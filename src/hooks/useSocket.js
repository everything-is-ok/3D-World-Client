import { useEffect, useState } from "react";
import io from "socket.io-client";

const URL = process.env.REACT_APP_SERVER_URL;

// NOTE: component mount에 한번 연결, unmount에 disconnect
function useSocket(userId) {
  const [socket, setSocket] = useState(null);
  const connection = io(URL);

  useEffect(() => {
    setSocket(connection);

    return () => connection.disconnect();
  }, [userId]);

  return socket;
}

export default useSocket;
