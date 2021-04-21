import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import MailItem from "./shared/MailItem";
import StyledButton from "./shared/StyledButton";
import { mailSelector, getMailList } from "../reducers/mailSlice";

// TODO: 일단 중앙에 띄워서 확인하기 위한 컨테이너
const Container = styled.div`
`;

const StyledList = styled.div`
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
        {/* TODO 메일아이템 클릭 시 디테일 뷰 띄우기 */}
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
