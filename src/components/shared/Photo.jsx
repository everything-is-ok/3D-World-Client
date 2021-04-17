import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const size = css`
  ${(props) => css`
    width: ${props.size}px;
    height: ${props.size}px;
  `}
`;

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
