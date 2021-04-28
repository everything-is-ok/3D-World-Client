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

function MailForm({ mailboxId, toggle }) {
  const [content, setContent] = useState("");

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      await fetchData("POST", `/mailbox/mail/${mailboxId}`, { content });

      toggle();
    } catch (err) {
      console.log(err.message);
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
    </Container>
  );
}

MailForm.propTypes = {
  mailboxId: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default MailForm;
