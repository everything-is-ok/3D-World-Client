import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import useSocketChat from "../hooks/useSocketChat";
import StyledInput from "./shared/StyledInput";
import StyledButton from "./shared/StyledButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  // NOTE: 전체 사이즈 확인을 위한 border
  border: 2px solid black;
`;

const ChatDiv = styled.div`
  padding: 0.375rem 0.75rem;
  font-size: 0.8rem;
  color: #212529;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: white;
`;

// TODO: 채팅이 많아지면 스크롤하여 이전의 채팅도 볼 수 있도록 수정
const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100px;
  color: white;
`;

const FormContainer = styled.form`
`;

// TODO: 내가 보낸 채팅과 받은 채팅을 구분할 수 있도록 수정
function Chat({ socket }) {
  const [message, setMessage] = useState("");
  const [chatList, setChatList] = useState([]);

  useSocketChat(socket, handleChat);

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
    // TODO: socket error handle
    e.preventDefault();

    socket.emit("chat message", { message });
    addChatElement(message);
    setMessage("");
  }

  return (
    <Container>
      <ChatList>
        {/* TODO: key 부여해야함. 보낸사람, 내용, 시간 등 조합하여 만들 수 있을 듯 */}
        {chatList.map((chat) => <ChatDiv>{chat}</ChatDiv>)}
      </ChatList>
      <FormContainer
        onSubmit={handleSubmit}
      >
        <StyledInput
          value={message}
          onChange={handleInputChange}
        />
        <StyledButton type="submit">Submit</StyledButton>
      </FormContainer>
    </Container>
  );
}

Chat.propTypes = {
  socket: PropTypes.any,
};

export default Chat;
