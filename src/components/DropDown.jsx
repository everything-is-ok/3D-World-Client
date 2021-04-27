import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import StyledButton from "./shared/StyledButton";

const Container = styled.div`
  position: relative;
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
  z-index: 1;
  ${display}
`;

function DropDown({
  name,
  children,
  isOpen,
  toggle,
}) {
  return (
    <Container onBlur={toggle}>
      <StyledButton onClick={toggle}>
        {name}
      </StyledButton>
      <List isOpen={isOpen}>
        {children}
      </List>
    </Container>
  );
}

DropDown.propTypes = {
  name: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  children: PropTypes.any,
};

export default DropDown;
