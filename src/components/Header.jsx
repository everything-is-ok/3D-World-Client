import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

import DropDown from "./DropDown";
import MiniProfile from "./MiniProfile";
import StyledButton from "./shared/StyledButton";
import { logout } from "../reducers/userSlice";
import useModal from "../hooks/useModal";

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  padding: 1%;
  border-bottom: 2px solid black;
`;

// TODO 친구목록에 key 추가하기
function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    _id,
    name,
    photoURL,
    friends,
  } = useSelector((state) => state.user.data);
  const { modalOpen, toggle } = useModal();

  return (
    <Container>
      <MiniProfile
        photoURL={photoURL}
        name={name}
      />
      <DropDown
        name="친구 목록"
        isOpen={modalOpen}
        toggle={toggle}
      >
        {friends.map((friend) => (
          <Link to={`/room/${friend._id}`} onClick={toggle}>
            <MiniProfile
              key={friend._id}
              photoURL={friend.photoURL}
              name={friend.name}
            />
          </Link>
        ))}
      </DropDown>
      <div>
        {/* TODO: 월드, 홈 버튼은 토글방식으로 컴포넌트 분리 */}
        <StyledButton>
          <Link to="/world">
            월드
          </Link>
        </StyledButton>
        <StyledButton onClick={() => history.push("/")}>홈</StyledButton>
        <StyledButton onClick={() => dispatch(logout())}>로그아웃</StyledButton>
      </div>
    </Container>
  );
}

export default Header;
