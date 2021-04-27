import { useEffect } from "react";

import EVENTS from "../constants/socketEvents";

function useSocketChat(socket, handleChat) {
  const { CHAT_MESSAGE } = EVENTS;

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on(CHAT_MESSAGE, handleChat);
    return () => socket.off(CHAT_MESSAGE, handleChat);
  }, [socket]);
}

export default useSocketChat;
