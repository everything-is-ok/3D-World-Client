import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import MailItem from "./shared/ListItem";
import StyledButton from "./shared/StyledButton";
import { mailSelector, getMailList } from "../reducers/mailSlice";

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

function MailList({ handleDeleteMailItem, handleDeleteMailList }) {
  const dispatch = useDispatch();
  const mailList = useSelector(mailSelector);

  useEffect(() => {
    if (!mailList) {
      dispatch(getMailList());
    }
  }, []);

  return (
    <Container>
      <StyledList>
        {mailList && mailList.map((mail) => (
          <MailItem
            key={mail._id}
            mail={mail}
            handleDelete={handleDeleteMailItem}
          />
        ))}
        <DeleteAllButton onClick={handleDeleteMailList}>
          Delete All
        </DeleteAllButton>
      </StyledList>
    </Container>
  );
}

MailList.propTypes = {
  handleDeleteMailItem: PropTypes.func.isRequired,
  handleDeleteMailList: PropTypes.func.isRequired,
};

export default MailList;
