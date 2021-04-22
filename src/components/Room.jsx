import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Chat from "./Chat";
import Mailbox from "./models/Mailbox";
import StyledButton from "./shared/StyledButton";
import Floor from "./models/Floor";
import useRoom from "../hooks/useRoom";
import useSocket from "../hooks/useSocket";
import { updateUserData, userIdSelector, userNameSelector } from "../reducers/userSlice";
import TempModel from "./models/TempModel";
import TempFriendModel from "./models/TempFriendModel";
import usePosition from "../hooks/usePosition";
import useSocketMove from "../hooks/useSocketMove";
import useSocketRoom from "../hooks/useSocketRoom";
import Universe from "./models/Universe";

const Container = styled.div`
  position: relative;
  width: 80%;
  height: 100%;

  // NOTE: 사이즈 확인용 border
  border: 2px solid black;
`;

const AbsoluteContainer = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
  width: 40%;
  height: 20%;
`;

// NOTE: room의 id라는 전제로 작성
// NOTE: MainProfle에서 submit하면, re-render가 일어나지만, Main이 re-render되서가 아니라, Room내부에서 user를 조회하기때문.
// TODO: mailbox click했을때, re-render 최적화
// TODO: 아주 힘들 예정, 방 정보로 아이템을 배치해야한다.
function Room({ id, handleClickMailbox }) {
  const userId = useSelector(userIdSelector);
  const userName = useSelector(userNameSelector);
  const dispatch = useDispatch();

  const entrancePosition = [1 * 40, 24, 7 * 40];
  const [friends, setFriends] = useState([]);
  const { position: dynamicPosition, direction } = usePosition([4 * 40, 24, 7 * 40]);
  const socket = useSocket();
  const room = useRoom(id);

  const memoUpdateFriendsMove = useCallback(({ user: u, position: p, direction: d }) => {
    setFriends((prev) => prev.map((friend) => {
      if (friend.user.id !== u.id) {
        return friend;
      }

      return { user: u, position: p, direction: d };
    }));
  }, [setFriends]);

  // TODO: 이동 방향을 바꾸면, onListenMove가 2번 실행됨. 최적화 필요
  useSocketMove({
    socket,
    position: dynamicPosition,
    direction,
    onListenMove: memoUpdateFriendsMove,
  });

  const memoAddExistingFriend = useCallback((posInfo) => {
    setFriends((prev) => prev.concat(posInfo));
  }, [setFriends]);

  const memoAddNewFriend = useCallback(({ id: i, name, socketId }) => {
    setFriends((prev) => prev.concat({
      user: { id: i, name },
      position: entrancePosition,
      direction: [0, 0, 0],
    }));
  }, [setFriends]);

  const memoDeleteFriend = useCallback(({ id: i, name }) => {
    setFriends((prev) => prev.filter((friend) => friend.user.id !== i));
  }, [setFriends]);

  useSocketRoom({
    socket,
    onListenParticipants: memoAddExistingFriend,
    onListenRoom: memoAddNewFriend,
    onListenLeave: memoDeleteFriend,
    userId,
    userName,
    roomId: room?._id,
    position: dynamicPosition,
    direction,
  });

  // TODO: 필요 없어지면 삭제
  const isMyRoom = id === undefined || userId === id;

  function ControlCam() {
    useFrame(({ camera }) => camera.lookAt(160, 0, 160));

    return null;
  }

  async function handleAddFriendClick() {
    dispatch(updateUserData({ friend: id }));
  }

  return (
    <Container>
      <Canvas camera={{ position: [160, 100, 400], fov: 80 }}>
        <Universe
          position={[4 * 40, 0, 4 * 40]}
          radius={200}
        />
        <ambientLight intensity={2} />
        <pointLight position={[40, 40, 40]} />
        <TempModel
          socket={socket}
          name="너"
          position={[...dynamicPosition]}
          direction={direction}
        />
        {friends.length
          && friends.map(({ user: u, position, direction: d }) => (
            <TempFriendModel key={u.id} user={u.name} position={position} direction={d} />
          ))}
        <Suspense fallback={null}>
          {/* <Mailbox
            position={[7 * 40, 7 * 40]}
            onClick={() => handleClickMailbox(room.mailboxId)}
          /> */}
        </Suspense>
        <Floor width={8} height={8} />
        <OrbitControls />
        <ControlCam />
      </Canvas>
      <AbsoluteContainer>
        <Chat socket={socket} />
      </AbsoluteContainer>
      {isMyRoom ? (
        <StyledButton
          type="button"
          onClick={() => console.log("click reomeling")}
        >
          리모델링
        </StyledButton>
      ) : (
        <StyledButton
          type="button"
          onClick={handleAddFriendClick}
        >
          친구추가
        </StyledButton>
      )}
    </Container>
  );
}

Room.propTypes = {
  id: PropTypes.string.isRequired,
  handleClickMailbox: PropTypes.func.isRequired,
};

export default React.memo(Room);
