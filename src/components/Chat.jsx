import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import useSocketChat from "../hooks/useSocketChat";
import StyledInput from "./shared/StyledInput";

const ChatHeader = styled.header`
 padding: 0.5rem;
 font-weight: bolder;
 border-bottom: 1.5px dashed ${(props) => props.theme.titleColor.color};
 margin-bottom: 1rem;
 color: ${(props) => props.theme.titleColor.color};
`;

const ChatButton = styled.button`
  position: absolute;
  bottom: 5px;
  right: 3px;
`;

const ChatContainer = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
`;

const ChatMessage = styled.li`
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
  color: #313131;
`;

// TODO: 채팅 입력하면 맨 밑이 보이도록
const ChatList = styled.ul`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  max-height: 300px;
  border-radius: 2px;
  background-color: #f0eeee;
  margin-bottom: 1rem;
  overflow-y: scroll;
`;

const FormContainer = styled.form`
  position: relative;
`;

// TODO: 내가 보낸 채팅과 받은 채팅을 구분할 수 있도록 수정
function Chat({ socket }) {
  const [message, setMessage] = useState("");
  const [chatList, setChatList] = useState([]);
  const inputRef = useRef();
  const chatListRef = useRef();

  useSocketChat(socket, handleChat);

  useEffect(() => {
    chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
  }, [message]);

  useEffect(() => {
    setChatList([]);
  }, [socket]);

  function handleChat(data) {
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
    addChatElement({ user: "나", message });
    setMessage("");
  }

  return (
    <ChatContainer>
      <ChatHeader>
        <span>채팅하기</span>
      </ChatHeader>
      <ChatList ref={chatListRef}>
        {chatList.map((chat) => (
          <>
            <ChatMessage>
              {`${chat.user} : ${chat.message}`}
            </ChatMessage>
          </>
        ))}
      </ChatList>
      <FormContainer
        onSubmit={handleSubmit}
      >
        <StyledInput
          ref={inputRef}
          value={message}
          onChange={handleInputChange}
        />
        <ChatButton type="submit">보내기 🚀</ChatButton>
      </FormContainer>
    </ChatContainer>
  );
}

Chat.propTypes = {
  socket: PropTypes.any,
};

export default Chat;
