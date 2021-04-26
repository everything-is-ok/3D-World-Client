import io from "socket.io-client";
import EVENTS from "../constants/socketEvents";

// NOTE: callback 함수 실행시키는 쪽 잘 보기.

const {
  JOIN_WORLD,
  LEAVE_WORLD,
  JOIN_ROOM,
  LEAVE_ROOM,
  USER_MOVEMENT,
  UPDATE_MOVEMENT,
  OLD_USER_INFO,
  CHAT_MESSAGE,
  FURNITURE_MOVEMENT,
  NEW_USER_SOCKET_ID,
} = EVENTS;

const socket = io(process.env.REACT_APP_API_URL);

function getMySocketId() {
  return socket.id;
}

const worldSocket = {
  joinWorld: (userInfo) => {
    socket.emit(JOIN_WORLD, userInfo);
  },
  sendUserMovement: ({ id, newPosition, newDirection }) => {
    socket.emit(USER_MOVEMENT, { id, newPosition, newDirection });
  },
  listenUserJoin: (userInfo) => {
    socket.on(JOIN_WORLD, (userInfo));
  },
  listenOldUserInfo: (userInfo, cb) => {
    socket.on(OLD_USER_INFO, cb);
  },
  // NOTE: 월드 떠날때 setOtherUsers실행되어야함. 콜백으로 오는지? -> useWorldSocket- 72.
  listenUserLeave: (userInfo, cb) => {
    socket.on(LEAVE_WORLD, cb);
  },
  removeWorldListener: () => {
    // Off.
  },
};

// NOTE: room and chat and friend ?
const roomSocket = {
  joinRoom: () => {
    // TODO: add
    socket.emit(JOIN_ROOM);
  },
  listenUserJoin: (cb) => {
    socket.on(JOIN_ROOM, cb);
  },
  listenUserMovement: (cb) => {
    socket.on(USER_MOVEMENT, cb);
  },
  listenOldUserInfo: (cb) => {
    socket.on(OLD_USER_INFO, cb);
  },
  listenUserLeave: (cb) => {
    socket.on(LEAVE_ROOM, cb);
  },
  listenChatMessage: (cb) => {
    socket.on(CHAT_MESSAGE, cb);
  },
  removeFirendsListener: () => {
    // off
  },
};

// NOTE: friend?
// NOTE: 콜백을 콜백이라고 해도 되고, 더 명시적으로 addExistingFriend 등을 써도 될 듯 합니다.

const furnitureSocket = {
  // TODO: 더 구체적으로 옮기기
  sendUpdatedFurniture: (data) => {
    socket.emit(FURNITURE_MOVEMENT, data);
  },
  listenFurnitureMovement: (cb) => {
    socket.on(FURNITURE_MOVEMENT, cb);
  },
  removeFurnitureListeners: () => {
  },
};

export {
  roomSocket,
  worldSocket,
  getMySocketId,
  furnitureSocket,
};
