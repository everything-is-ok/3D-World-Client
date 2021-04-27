import { useEffect, useState } from "react";

import EVENTS from "../constants/socketEvents";

// NOTE: 최초 mount부터 socket에 값이 있기 때문에, useEffect의 effect들이 모두 실행 됨.
function useSocketFriends({
  socket,
  entrancePosition,
}) {
  const [friends, setfriends] = useState([]);
  const {
    USER_MOVEMENT,
    OLD_USER_INFO,
    LEAVE_ROOM,
    JOIN_ROOM,
  } = EVENTS;

  useEffect(() => {
    if (!socket) {
      return;
    }

    function updateFriendsMove({ user: u, position: p, direction: d }) {
      setfriends((prev) => prev.map((friend) => {
        if (friend.user.id !== u.id) {
          return friend;
        }

        return { user: u, position: p, direction: d };
      }));
    }

    socket.on(USER_MOVEMENT, updateFriendsMove);
    return () => socket.off(USER_MOVEMENT, updateFriendsMove);
  }, [socket]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    function addExistingFriend(posInfo) {
      setfriends((prev) => prev.concat(posInfo));
    }

    function deleteFriend(user) {
      setfriends((prev) => prev.filter((friend) => friend.user.id !== user.id));
    }

    // NOTE: join room 최초 emit과 같은 context에서 실행됨.
    socket.on(OLD_USER_INFO, addExistingFriend);
    socket.on(LEAVE_ROOM, deleteFriend);
    return () => {
      socket.off(OLD_USER_INFO, addExistingFriend);
      socket.off(LEAVE_ROOM, deleteFriend);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    function addNewFriend(user) {
      setfriends((prev) => prev.concat({
        user,
        position: entrancePosition,
        direction: 0,
      }));
    }

    socket.on(JOIN_ROOM, addNewFriend);
    return () => socket.off(JOIN_ROOM, addNewFriend);
  }, [socket]);

  return friends;
}

export default useSocketFriends;
