import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: gray;

  // NOTE: 전체 사이즈 확인을 위한 border
  border: 2px solid black;
`;

const ChatInput = styled.input`
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const ChatDiv = styled.div`
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const ChatList = styled.div`
  display: block;
  width: 70vw;
  height: 50vh;
`;

const Form = styled.form`
`;

function Chat() {
  const [message, setMessage] = useState("");
  const [chatList, setChatList] = useState([]);

  function addChatElement(data) {
    setChatList((prev) => [...prev, data]);
  }

  function handleInputChange(e) {
    setMessage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // TODO 웹소켓 emit
    addChatElement(message);
    setMessage("");
  }

  return (
    <Container>
      <ChatList>
        {chatList.map((chat) => <ChatDiv>{chat}</ChatDiv>)}
      </ChatList>
      <Form
        onSubmit={handleSubmit}
      >
        <ChatInput
          value={message}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </Form>
    </Container>
  );
}

Chat.propTypes = {
  // handleSubmit: PropTypes.func.isRequired,
};

export default Chat;
