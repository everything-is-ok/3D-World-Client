// NOTE: component mount에 한번 연결, unmount에 disconnect
// NOTE: TAKEN TO UTIL
function useUserSocket(socket) {
  function fetchNewPositionToWorld(id, newPosition, newDirection) {
    socket.emit("user movement", { id, newPosition, newDirection });
  }

  return { fetchNewPositionToWorld };
}

export default useUserSocket;
