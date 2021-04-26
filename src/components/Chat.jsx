import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import useSocketChat from "../hooks/useSocketChat";
import StyledInput from "./shared/StyledInput";

const ChatButton = styled.button`
  position: absolute;
  bottom: 5px;
  right: 3px;
`;

const ChatContainer = styled.div`
`;

const ChatDiv = styled.div`
  padding: 0.375rem 0.75rem;
  font-size: 0.8rem;
  color: #212529;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  background-color: grey;
  color: white;
`;

// TODO: 채팅 입력하면 맨 밑이 보이도록
const ChatList = styled.div`
  width: 100%;
  max-height: 300px;
  color: white;
  overflow: scroll;
`;

const FormContainer = styled.form`
  background-color: grey;
  position: relative;
`;

// TODO: 내가 보낸 채팅과 받은 채팅을 구분할 수 있도록 수정
function Chat({ socket }) {
  const [message, setMessage] = useState("");
  const [chatList, setChatList] = useState([]);
  const inputRef = useRef();
  useSocketChat(socket, handleChat);

  useEffect(() => {
    setChatList([]);
  }, [socket]);

  function handleChat({ message: data }) {
    setChatList((prev) => prev.concat(data));
  }

  function addChatElement(data) {
    setChatList((prev) => prev.concat(data));
  }

  function handleInputChange(e) {
    setMessage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!message) {
      return;
    }
    // TODO: socket error handle
    socket.emit("chat message", { message });
    addChatElement(message);
    setMessage("");
  }

  return (
    <ChatContainer>
      <ChatList>
        {/* TODO: key 부여해야함. 보낸사람, 내용, 시간 등 조합하여 만들 수 있을 듯 */}
        {chatList.map((chat) => <ChatDiv>{chat}</ChatDiv>)}
      </ChatList>
      <FormContainer
        onSubmit={handleSubmit}
      >
        <StyledInput
          ref={inputRef}
          value={message}
          onChange={handleInputChange}
        />
        <ChatButton type="submit">SEND 🚀</ChatButton>
      </FormContainer>
    </ChatContainer>
  );
}

Chat.propTypes = {
  socket: PropTypes.any,
};

export default Chat;
