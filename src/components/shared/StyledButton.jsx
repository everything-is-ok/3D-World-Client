import styled from "styled-components";

// TODO: 버튼 스타일 작업
const StyledButton = styled.button`
  border: 2px solid black;

  & + & {
    margin-left: 10px;
  }
`;

export default StyledButton;
