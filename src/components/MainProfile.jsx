import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  width: 200px;
  height: 500px;

  // NOTE: 사이즈 확인용 border
  border: 2px solid black;
`;

// NOTE: 로그인한 유저의 정보가 아닌, 방 주인의 정보를 보여준다.
// NOTE: 유저 아이디(_id)를 prop으로 받아서, 서버에서 해당 유저의 정보를 받아온다.
// TODO: 유저 정보 수정 기능.
function MainProfile({ id }) {
  return (
    <Container />
  );
}

MainProfile.propTypes = {
  id: PropTypes.string.isRequired,
};

export default MainProfile;
