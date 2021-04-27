import { useEffect, useState } from "react";
import io from "socket.io-client";
import EVENTS from "../constants/socketEvents";

const URL = process.env.REACT_APP_SERVER_URL;
const { LEAVE_ROOM } = EVENTS;
// const connection = io(URL); // 1. mount - 연결,

// NOTE: component mount에 한번 연결, unmount에 disconnect
// TODO: mount에 연결이 아닌, re-render마다 계속해서 연결됨. 수정 필요
function useSocket(userId) {
  const [socket, setSocket] = useState(io(URL)); // 4. state 변경
  // 5. re-render로 한번 더 연결,
  // 7. getRoomById 비동기 처리가 오면 한번 더 연결,
  // 8. userId 변경 시, 한번 더 연결,
  // 11. re-render로 다시 연결...반복....

  useEffect(() => {
    setSocket(io(URL)); // 2. 1에서 연결된 connection을 state로 변경.
    // 10. 8번의 connection을 state로 변경

    return () => socket.emit(LEAVE_ROOM); // 3. 1에서 연결된 connection closure 형성.
    // 9. 1에서 연결된 connection을 disconnect
  }, [userId]);

  return socket; // 6. 1에서 연결된 connection을 return.
}

export default useSocket;
