import styled from "styled-components";

const StyledButton = styled.button`
  border: 2px solid black;

  & + & {
    margin-left: 10px;
  }
`;

export default StyledButton;
