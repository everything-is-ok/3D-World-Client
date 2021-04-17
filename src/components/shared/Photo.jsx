import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const size = css`
  ${(props) => css`
    width: ${props.size}px;
    height: ${props.size}px;
  `}
`;

// NOTE: 필요하다면 함수형 컴포넌트로 구조 변경해야 할 수도
// TODO: 스타일 작업
const Photo = styled.img`
  ${size}
`;

Photo.propTypes = {
  size: PropTypes.number,
};

Photo.defaultProps = {
  size: 40,
};

export default Photo;
