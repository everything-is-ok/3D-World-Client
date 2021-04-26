import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  height: 95vh;
  background: ${(props) => props.theme.bg.color};
  background-image: linear-gradient(rgba(129, 129, 129, 0.7) .1em, transparent .1em), linear-gradient(90deg, rgba(129, 129, 129, 0.7) .1em, transparent .1em);
  background-size: 1.5em 1.5em;
`;

const BorderWrapper = styled.div`
  width: 85%;
  padding: 25px;
  background: ${(props) => props.theme.layoutBg1.color};
  border: 1px solid ${(props) => props.theme.layoutBorder1.color};
  border-radius: 10px;
`;

const BgWrapper = styled.div`
  z-index: 0;
  position: relative;
  display: flex;
  height: 100%;
  padding: 20px 8px;
  background: ${(props) => props.theme.layoutBg2.color};
  border: 2px dashed ${(props) => props.theme.layoutBorder2.color};
  border-radius: 10px;
`;

const Layout = ({ children }) => (
  <Wrapper>
    <BorderWrapper>
      <BgWrapper>{children}</BgWrapper>
    </BorderWrapper>
  </Wrapper>
);

Layout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Layout;
