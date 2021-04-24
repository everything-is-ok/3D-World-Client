import React from "react";
import PropTypes from "prop-types";

import TempFriendModel from "./models/TempFriendModel";
import useSocketFriends from "../hooks/useSocketFriends";

function Friends({ socket }) {
  // TODO: constant로 만들기
  const entrancePosition = [2 * 40, 24, 0 * 40];
  const friends = useSocketFriends({ socket, entrancePosition });

  return (
    <>
      {friends.map(({ user: u, position, direction: d }) => (
        <TempFriendModel key={u.id} name={u.name} position={position} direction={d} />
      ))}
    </>
  );
}

Friends.propTypes = {
  socket: PropTypes.any.isRequired,
};

export default Friends;
