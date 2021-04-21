import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledSpan = styled.span`
  // NOTE: 사이즈 확인용 border
  border: 2px solid black;
`;

// NOTE: 유저의 이름을 표시해줄 Comp인데, Name이란 Comp로 관리하는 것이 적당할까? 조금 더 범용적인 이름이 있을까?
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
