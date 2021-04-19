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

// TODO: 배치 수정
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StyledList = styled.div`
  width: 30vw;
  height: 50vh;
  padding: 3vw;

  // NOTE: 사이즈 확인용 border
  border: 2px solid black;
`;

function MailList() {
  const mailList = useSelector(mailSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!mailList) {
      dispatch(getMailList());
    }
  }, []);

  function handleDeleteButtonClick(mailId) {
    dispatch(deleteMailItem(mailId));
  }

  return (
    <Container>
      <StyledList>
        {mailList.map((mail) => (
          <MailItem
            key={mail._id}
            mail={mail}
            handleDelete={handleDeleteButtonClick}
          />
        ))}
      </StyledList>
      <StyledButton onClick={() => dispatch(deleteMailList())}>
        Delete All
      </StyledButton>
    </Container>
  );
}

export default MailList;
