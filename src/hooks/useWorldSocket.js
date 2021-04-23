import { useEffect, useState } from "react";
import io from "socket.io-client";

const URL = process.env.REACT_APP_SERVER_URL;

// NOTE: component mount에 한번 연결, unmount에 disconnect
function useWorldSocket(user, position, direction = 0) {
  const [socket, setSocket] = useState(null);
  const [otherUsers, setOtherUsers] = useState([]);

  useEffect(() => {
    const connection = io(URL);

    setSocket(connection);
    return () => connection.disconnect();
  }, [setSocket]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.emit("world", { user, position, direction });
    // TODO: 변수명 정리 (user/ newuser/ incominguser.., data...)
    socket.on("worldConnection", ({
      direction: newDirection,
      user: newUser,
      position: newUserPosition,
    }) => {
      const { name } = newUser;
      setOtherUsers((prev) => ([
        ...prev,
        {
          name,
          id: newUser._id,
          position: newUserPosition,
          direction: newDirection,
        },
      ]));
    });
  }, [socket, user]);

  return { socket, otherUsers };
}

export default useWorldSocket;
