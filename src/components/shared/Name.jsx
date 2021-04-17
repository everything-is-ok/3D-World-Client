import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledSpan = styled.span`
  // NOTE: 사이즈 확인용 border
  border: 2px solid black;
`;

function Name({ name }) {
  return (
    <StyledSpan>
      {name}
    </StyledSpan>
  );
}

Name.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Name;
