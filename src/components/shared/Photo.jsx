import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const size = css`
  ${(props) => css`
    width: ${props.size}px;
    height: ${props.size}px;
  `}
`;

<<<<<<< HEAD
const Photo = styled.img`
  ${size}
=======
const borderRadius = css`
  ${(props) => css`
    border-radius: ${props.borderRadius};
  `}
`;

// NOTE: 필요하다면 함수형 컴포넌트로 구조 변경해야 할 수도
// TODO: 스타일 작업
const Photo = styled.img`
  ${size}
  ${borderRadius}
>>>>>>> 4a43d726154bcef751a83d84f4618b34c0886a79
`;

Photo.propTypes = {
  size: PropTypes.number,
<<<<<<< HEAD
=======
  borderRadius: PropTypes.string,
>>>>>>> 4a43d726154bcef751a83d84f4618b34c0886a79
};

Photo.defaultProps = {
  size: 40,
<<<<<<< HEAD
=======
  borderRadius: "0.3rem",
>>>>>>> 4a43d726154bcef751a83d84f4618b34c0886a79
};

export default Photo;
