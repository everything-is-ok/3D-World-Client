import React, { useState } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import StyledButton from "./shared/StyledButton";

const Container = styled.div`
  position: relative;

  // NOTE: 전체 사이즈 확인을 위한 border
  border: 2px solid black;
`;

const display = css`
  ${({ isOpen }) => {
    if (isOpen) {
      return css`
        width: 200px;
        height: 200px;
      `;
    }

    return css`
      width: 0;
      height: 0;
    `;
  }}
`;

const List = styled.div`
  position: absolute;
  left: 50%;
  top: calc(100% + 1rem);
  transform: translateX(-50%);
  background-color: skyblue;
  border-radius: 0.3rem;
  overflow: hidden;
  transition: all .3s ease-in-out .3s;

  ${display}
`;

// TODO: 현재 server에서 friends를 populate하지 않음.
function DropDown({ name, children }) {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  return (
    <Container>
      <StyledButton onClick={() => setDropDownOpen((prev) => !prev)}>
        {name}
      </StyledButton>
      <List isOpen={dropDownOpen}>
        {children}
      </List>
    </Container>
  );
}

DropDown.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.any,
};

export default DropDown;