import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import StyledInput from "./shared/StyledInput";
import StyledButton from "./shared/StyledButton";
import fetchData from "../utils/fetchData";
import { updateError } from "../reducers/mailSlice";

const Container = styled.div`
`;

const Form = styled.form`
`;

function MailForm({ mailboxId, toggle }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      await fetchData("POST", `/mailbox/mail/${mailboxId}`, { content });

      toggle();
    } catch (err) {
      dispatch(updateError(err.message));
    }
  }

  function handleInputChange(e) {
    setContent(e.target.value);
  }

  return (
    <Container>
      <Form
        onSubmit={handleFormSubmit}
      >
        <StyledInput
          name="content"
          type="text"
          value={content}
          onChange={handleInputChange}
        />
        <StyledButton type="submit">
          Submit
        </StyledButton>
        <StyledButton onClick={toggle}>
          Close
        </StyledButton>
      </Form>
    </Container>
  );
}

MailForm.propTypes = {
  mailboxId: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default MailForm;
