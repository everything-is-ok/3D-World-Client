import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import MailItem from "./shared/MailItem";
import CustomModal from "./shared/CustomModal";
import StyledInput from "./shared/StyledInput";
import StyledButton from "./shared/StyledButton";
import { mailSelector, getMailList } from "../reducers/mailSlice";

// TODO: 일단 중앙에 띄워서 확인하기 위한 컨테이너
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

function MailboxList({
  toggle,
  handleDeleteMailItem,
  handleDeleteMailList,
}) {
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

  return (
    <Container>
      <CustomModal>
        {isDetail ? (
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
        ) : (
          <>
            <Content>{selectedMail.Content}</Content>
            <StyledButton onClick={handleDeleteMailItem}>
              삭제
            </StyledButton>
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
  handleDeleteMailItem: PropTypes.func.isRequired,
  handleDeleteMailList: PropTypes.func.isRequired,
};

export default MailboxList;
