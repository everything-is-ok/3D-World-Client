import { useEffect, useState } from "react";
import io from "socket.io-client";
import EVENTS from "../constants/socketEvents";

const URL = process.env.REACT_APP_SERVER_URL;
const connection = io(URL);

// NOTE: component mount에 한번 연결, unmount에 disconnect
// TODO: mount에 연결이 아닌, re-render마다 계속해서 연결됨. 수정 필요
function useSocket(userId) {
  const [socket, setSocket] = useState(connection);

  useEffect(() => {
    console.log("connect");
    return () => socket.disconnect();
  }, [userId]);

  return socket;
}

export default useSocket;
