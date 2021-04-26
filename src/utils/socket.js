import io from "socket.io-client";

const socket = io(process.env.REACT_APP_API_URL);

function getMySocketId() {
  return socket.id;
}

const worldSocket = {
  joinWorld: (userInfo) => {
    socket.emit("join World", userInfo);
  },
  sendUserMovement: ({ id, newPosition, newDirection }) => {
    socket.emit("user movement", { id, newPosition, newDirection });
  },
  listenUserJoin: (userInfo) => {
    socket.on("join world", (userInfo));
  },
};

// NOTE: room and chat and friend ?
const roomSocket = {

};

// NOTE: friend?

const furnitureSocket = {

};

export {
  roomSocket,
  worldSocket,
  getMySocketId,
  furnitureSocket,
};
