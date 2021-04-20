import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useSelector } from "react-redux";

// TODO atomic 하게 나누기
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

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

function MailForm({ content, handleFormSubmit, handleInputChange }) {
  return (
    <Form
      onSubmit={handleFormSubmit}
    >
      <FormGroup>
        <Label htmlFor="content">
          content
        </Label>
        <Input
          id="content"
          name="content"
          type="text"
          value={content}
          onChange={handleInputChange}
        />
      </FormGroup>
      <button type="submit">Submit</button>
    </Form>
  );
}

MailForm.propTypes = {
  content: PropTypes.string.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default MailForm;
