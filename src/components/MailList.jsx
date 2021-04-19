import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import MailItem from "./shared/ListItem";
import StyledButton from "./shared/StyledButton";
import {
  mailSelector,
  getMailList,
  deleteMailItem,
  deleteMailList,
} from "../reducers/mailSlice";

// TODO: 일단 중앙에 띄워서 확인하기 위한 컨테이너
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: -1;
`;

const StyledList = styled.div`
  width: 30vw;
  height: 50vh;
  padding: 3vw;

  // NOTE: 사이즈 확인용 border
  border: 2px solid black;
`;

const DeleteAllButton = styled(StyledButton)`
  position: relative;
  top: 60%;
  color: tomato;
  border-color: tomato;
`;

function MailList() {
  const dispatch = useDispatch();
  const mailList = useSelector(mailSelector);
  console.log(mailList);

  if (!mailList) {
    dispatch(getMailList());
  }

  function handleDeleteButtonClick(mailId) {
    dispatch(deleteMailItem(mailId));
  }

  return (
    <Container>
      <StyledList>
        {mailList && mailList.map((mail) => (
          <MailItem
            key={mail._id}
            mail={mail}
            handleDelete={() => handleDeleteButtonClick(mail._id)}
          />
        ))}
        <DeleteAllButton onClick={() => dispatch(deleteMailList())}>
          Delete All
        </DeleteAllButton>
      </StyledList>
    </Container>
  );
}

export default MailList;
