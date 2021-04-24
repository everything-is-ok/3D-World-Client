import { useEffect, useState } from "react";

function useSocketFriends({
  socket,
  entrancePosition,
}) {
  const [friends, setfriends] = useState([]);

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

    socket.on("move", updateFriendsMove);
    return () => socket.off("move", updateFriendsMove);
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

    socket.on("setOldUser", addExistingFriend);
    socket.on("leave", deleteFriend);
    return () => {
      socket.off("setOldUser", addExistingFriend);
      socket.off("leave", deleteFriend);
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

    socket.on("room", addNewFriend);
    return () => socket.off("room", addNewFriend);
  }, [socket]);

  return friends;
}

export default useSocketFriends;
