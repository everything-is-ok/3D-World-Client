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
`;

const StyledList = styled.ul`
  all: unset;
  width: 30vw;
  height: 50vh;
  font-size: 10pt;
  z-index: 10;

  // NOTE: 사이즈 확인용 border
  border: 1px solid black;
`;

// TODO 맨 아래쪽에 고정되어야할 것 같음
const DeleteAllButton = styled(StyledButton)`
  color: tomato;
  border-color: tomato;
`;

function MailList() {
  const dispatch = useDispatch();
  const mailList = useSelector(mailSelector);

  useEffect(() => {
    if (!mailList) {
      dispatch(getMailList());
    }
  }, []);

  // NOTE 아직 서버쪽에서 구현안된 기능이라 눌러봤자 안됨..
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
            handleDelete={handleDeleteButtonClick}
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
