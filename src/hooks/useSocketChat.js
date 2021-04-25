import { useEffect } from "react";

function useSocketChat(socket, handleChat) {
  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("chat message", handleChat);
    return () => socket.off("chat message", handleChat);
  }, [socket]);
}

export default useSocketChat;
