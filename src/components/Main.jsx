import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import MyProfile from "./MyProfile";
import Room from "./Room";
import OtherUserProfile from "./OtherUserProfile";
import { userIdSelector } from "../reducers/userSlice";
import useMailbox from "../hooks/useMailbox";
import MailboxModal from "./MailboxModal";

// TODO: 배치 수정
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 85vh;
  padding: 2%;
  margin: 1%;

  // NOTE: 사이즈 확인용 border
  border: 2px solid black;
`;

// NOTE: 내 방을 가던 남의 방을 가던 /room/:id 로 온다.
function Main() {
  const { userId } = useParams();
  const [prevUserId, setPrevUserId] = useState(userId);

  // NOTE: 확인 필요합니다. 여기서 유저를 바라보기때문에 유저 바뀔 때마다 밑의 룸이 리랜더링하는 경우가 있는지
  const loggedInUserId = useSelector(userIdSelector);
  // TODO: 필요 없어지면 삭제
  const isLoggedInUser = userId === undefined || loggedInUserId === userId;

  // NOTE: Room과 프로필 부분을 한번 더 분리해야 리렌더링을 막을 수 있을 것 같습니다.
  const {
    mailboxId,
    isToggled,
    toggle,
    handleClickMailbox,
  } = useMailbox(isLoggedInUser);

  // const mailboxRef = useRef({
  //   isToggled: false,
  //   mailboxId: null,
  // });

  // function handleClick(mailboxId) {
  //   mailboxRef.current = {
  //     isToggled: !mailboxRef.current.isToggled,
  //     mailboxId,
  //   };
  // }

  useEffect(() => {
    setPrevUserId(userId);
  }, [userId]);

  return (
    <Container>
      {isLoggedInUser ? (
        <MyProfile />
      ) : (
        <OtherUserProfile id={userId} />
      )}
      {/* TODO: World와 Room Comp를 토글방식으로 적용. */}
      { prevUserId === userId ? (
        <>
          <Room
            id={userId}
            isMyRoom={isLoggedInUser}
            // handleClickMailbox={handleClick}
            handleClickMailbox={handleClickMailbox}
          />
          {isToggled && (
            <MailboxModal
              toggle={toggle}
              mailboxId={mailboxId}
              isMyMailbox={isLoggedInUser}
              // mailboxRef={mailboxRef}
            />
          )}
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </Container>
  );
}

export default Main;
