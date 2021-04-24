import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import MailboxList from "./MailboxList";
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

const Form = styled.form`
`;

const FormGroup = styled.div`
  width: 100%;
`;

const Label = styled.label`
  padding-top: calc(0.375rem + 1px);
  padding-bottom: calc(0.375rem + 1px);
  margin-bottom: 0;
  font-size: inherit;
  line-height: 1.5;
`;

function MailboxModal({
  isMyMailbox,
  content,
  toggle,
  handleFormSubmit,
  handleInputChange,
  handleDeleteMailList,
  handleDeleteMailItem,
}) {
  return (
    <Container>
      {isMyMailbox ? (
        <MailboxList
          toggle={toggle}
          handleDeleteMailList={handleDeleteMailList}
          handleDeleteMailItem={handleDeleteMailItem}
        />
      ) : (
        <Form
          onSubmit={handleFormSubmit}
        >
          <FormGroup>
            <Label htmlFor="content">
              content
            </Label>
            <StyledInput
              id="content"
              name="content"
              type="text"
              value={content}
              onChange={handleInputChange}
            />
          </FormGroup>
          <StyledButton type="submit">
            Submit
          </StyledButton>
          <StyledButton onClick={toggle}>
            Close
          </StyledButton>
        </Form>
      )}
    </Container>
  );
}

MailboxModal.propTypes = {
  isMyMailbox: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleDeleteMailList: PropTypes.func.isRequired,
  handleDeleteMailItem: PropTypes.func.isRequired,
};

export default MailboxModal;
