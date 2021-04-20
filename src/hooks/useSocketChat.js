import { useEffect } from "react";

function useSocketChat(socket, handleChat) {
  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("chat", handleChat);
    return () => socket.off("chat", handleChat);
  }, [socket]);
}

export default useSocketChat;
