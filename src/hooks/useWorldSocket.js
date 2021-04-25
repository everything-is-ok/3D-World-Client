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

    return () => {
      connection.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    const userInfo = {
      ...user,
      direction,
      position,
    };

    socket.emit("join world", userInfo);
    // TODO: 변수명 정리 (user/ newuser/ incominguser.., data...)

    socket.on("join world", (newUserInfo) => {
      const {
        name,
        _id,
        direction: newUserDirection,
        position: newUserPosition,
      } = newUserInfo;
      console.log(newUserInfo);
      setOtherUsers((prev) => ([
        ...prev,
        {
          name,
          id: _id,
          position: newUserPosition,
          direction: newUserDirection,
        },
      ]));
    });

    socket.on("old user info", (oldUserInfo) => {
      const {
        _id,
        name,
        direction: oldUserDirection,
        position: oldUserPosition,
      } = oldUserInfo;

      setOtherUsers((prev) => ([
        ...prev,
        {
          name,
          id: _id,
          position: oldUserPosition,
          direction: oldUserDirection,
        },
      ]));
    });

    socket.on("leave world", (leftUserInfo) => {
      setOtherUsers((prev) => ([
        ...prev.filter((prevUSer) => prevUSer.id !== leftUserInfo._id),
      ]));
    });
  }, [socket, user]);

  return { socket, otherUsers };
}

export default useWorldSocket;
