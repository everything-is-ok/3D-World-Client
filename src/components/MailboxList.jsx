import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

import MailItem from "./shared/MailItem";
import StyledButton from "./shared/StyledButton";
import useMailList from "../hooks/useMailList";

const Container = styled.div`
  width: 100%;
  min-height: 40vh;
  height: 100%;
  margin-top: 1em;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  min-height: 30vh;
  background-color: gray;
  padding: 2vw;
`;

const ContentName = styled.div`
  width: 100%;
  background-color: gray;
  padding: 0.5em;
  margin-bottom: 2vh;
  font-weight: 600;
`;

const ContentDate = styled.div`
  font-size: 0.6em;
  color: #e7e7e7;
  text-align: end;
`;

const ContentDetail = styled.div`
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5em;
`;

function MailboxList({ toggle }) {
  const {
    mailList,
    isDetail,
    selectedMail,
    handleClose,
    handleSelectMail,
    handleDeleteMailItem,
    handleDeleteMailList,
  } = useMailList();

  return (
    <Container>
      {isDetail ? (
        <>
          <Content>
            <ContentName>{selectedMail.name}</ContentName>
            <ContentDetail>{selectedMail.content}</ContentDetail>
          </Content>
          <Buttons>
            <StyledButton onClick={handleDeleteMailItem}>
              삭제
            </StyledButton>
            <StyledButton onClick={handleClose}>
              확인
            </StyledButton>
            <StyledButton>
              <Link
                to={`/room/${selectedMail.sender}`}
                onClick={toggle}
              >
                친구집 방문하기
              </Link>
            </StyledButton>
          </Buttons>
        </>
      ) : (
        <>
          {mailList
            && mailList.mails.map((mail) => (
              <MailItem
                key={mail._id}
                mail={mail}
                handleClose={handleClose}
                handleSelectMail={() => handleSelectMail(mail)}
                handleDelete={() => handleDeleteMailItem(mail._id)}
              />
            ))}
          <Buttons>
            <StyledButton onClick={handleDeleteMailList}>
              모두 삭제
            </StyledButton>
            <StyledButton onClick={toggle}>
              닫기
            </StyledButton>
          </Buttons>
        </>
      )}
    </Container>
  );
}

MailboxList.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default MailboxList;
