import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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

function MailForm({ handleFormSubmit }) {
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
        />
      </FormGroup>
      <button type="submit">Submit</button>
    </Form>
  );
}

MailForm.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
};

export default MailForm;
