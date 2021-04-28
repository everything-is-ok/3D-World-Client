import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// TODO 분해하기

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

// TODO: 변수화해서 빼기, 현재 Input / Textarea 같은속성있음
const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
`;

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  resize: vertical;
  min-height: calc(1.5em + 1rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

function ProfileForm({
  name,
  photoURL,
  description,
  musicURL,
  handleInputChange,
  handleSubmit,
}) {
  return (
    <Form
      onSubmit={handleSubmit}
    >
      <FormGroup>
        <Label htmlFor="photoURL">
          photoURL
        </Label>
        <Input
          id="photoURL"
          name="photoURL"
          type="text"
          value={photoURL}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="name">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="description">
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          value={description}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="musicURL">
          BGM URL
        </Label>
        <Input
          id="musicURL"
          name="musicURL"
          type="text"
          value={musicURL}
          onChange={handleInputChange}
        />
      </FormGroup>
      <button type="submit">Submit</button>
    </Form>
  );
}

ProfileForm.propTypes = {
  name: PropTypes.string.isRequired,
  photoURL: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  musicURL: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ProfileForm;
