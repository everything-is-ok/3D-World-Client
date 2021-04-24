import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import MailItem from "./shared/MailItem";
import CustomModal from "./shared/CustomModal";
import StyledInput from "./shared/StyledInput";
import StyledButton from "./shared/StyledButton";
import {
  mailSelector,
  getMailList,
  deleteMailList,
  deleteMailItem,
} from "../reducers/mailSlice";

const Container = styled.div`
  position: fixed;
  top: 30%;
  left: 30%;
  width: 40vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3vw;

  border: 1px solid black;
`;

const Content = styled.div`
`;

function MailboxList({ toggle }) {
  const dispatch = useDispatch();
  const mailList = useSelector(mailSelector);
  const [isDetail, setIsDetail] = useState(false);
  const [selectedMail, setSelectedMail] = useState(null);

  useEffect(() => {
    dispatch(getMailList());
  }, []);

  function handleClick(mail) {
    setIsDetail((prev) => !prev);
    setSelectedMail(mail);
  }

  function handleDeleteMailList() {
    dispatch(deleteMailList());
  }

  function handleDeleteMailItem(mailId) {
    dispatch(deleteMailItem(mailId));
  }

  return (
    <Container>
      <CustomModal>
        {isDetail ? (
          <>
            <Content>{selectedMail.content}</Content>
            <Content>{selectedMail.sender}</Content>
            <Content>{selectedMail}</Content>
            <StyledButton onClick={handleDeleteMailItem}>
              삭제
            </StyledButton>
            <StyledButton onClick={() => console.log("이전")}>
              확인
            </StyledButton>
          </>
        ) : (
          <>
            {mailList.map((mail) => (
              <MailItem
                key={mail._id}
                mail={mail}
                onClick={handleClick}
                handleDelete={handleDeleteMailItem}
              />
            ))}
          </>
        )}
      </CustomModal>
      <StyledButton onClick={handleDeleteMailList}>
        Delete All
      </StyledButton>
      <StyledButton onClick={toggle}>
        Close
      </StyledButton>
    </Container>
  );
}

MailboxList.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default MailboxList;
