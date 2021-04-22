import React, {
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

import Chat from "./Chat";
import MailboxModal from "./MailboxModal";
import StyledButton from "./shared/StyledButton";
import Floor from "./models/Floor";
import Grugru from "./models/Grugru";
import Mailbox from "./models/Mailbox";
import useRoom from "../hooks/useRoom";
import useModal from "../hooks/useModal";
import useSocket from "../hooks/useSocket";
import { updateUserData, userIdSelector, userNameSelector } from "../reducers/userSlice";
import TempModel from "./models/TempModel";
import TempFriendModel from "./models/TempFriendModel";
import usePosition from "../hooks/usePosition";
import useSocketMove from "../hooks/useSocketMove";

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
function Room({ id }) {
  const userId = useSelector(userIdSelector);
  const userName = useSelector(userNameSelector);
  const dispatch = useDispatch();
  const { room } = useRoom(id);
  const { modalOpen, toggle } = useModal();
  const socket = useSocket(room?._id, userId, userName);
  const [friends, setFriends] = useState([]);
  const { position: dynamicPosition, direction } = usePosition([4 * 40, 24, 7 * 40]);
  const memoUpdateFriendsMove = useMemo(() => ({ user: u, position: p, direction: d }) => {
    setFriends((prev) => prev.map((friend) => {
      console.log("🍔", u);
      if (friend.user.id !== u.id) {
        return friend;
      }

      return { user: u, position: p, direction: d };
    }));
  }, [setFriends]);

  console.log("🍕", friends);

  const defaultFriendPosition = [1 * 40, 24, 7 * 40];

  // TODO: 이동 방향을 바꾸면, onListenMove가 2번 실행됨. 최적화 필요
  useSocketMove({
    socket,
    position: dynamicPosition,
    direction,
    onListenMove: memoUpdateFriendsMove,
  });

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("participants", (posInfo) => {
      console.log(posInfo);
      setFriends((prev) => prev.concat(posInfo));
    });
  }, [socket, setFriends]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("room", ({ id: i, name, socketId }) => {
      setFriends((prev) => prev.concat({
        user: { id: i, name },
        position: defaultFriendPosition,
        direction: [0, 0, 0],
      }));

      socket.emit("participants", {
        listener: i,
        posInfo: { user: { id: userId, name: userName }, position: dynamicPosition, direction },
      });
    });
  }, [socket]);

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
    room ? (
      <Container>
        {/* {JSON.stringify(room)} */}
        <Canvas camera={{ position: [160, 100, 400], fov: 80 }}>
          <color attach="background" args={["black"]} />
          <group position={[4 * 40, 0, 4 * 40]}>
            <Stars radius={200} />
          </group>
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
              <TempFriendModel key={u} user={u} position={position} direction={d} />
            ))}
          <Suspense fallback={null}>
            {/* <Mailbox
              position={[7 * 40, 7 * 40]}
              onClick={toggle}
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
            onClick={console.log("click reomeling")}
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
        {modalOpen && (
          <MailboxModal
            mailboxId={room.mailboxId}
            isMyMailbox={isMyRoom}
            handleClose={toggle}
          />
        )}
      </Container>
    ) : (
      <>
        <h1>
          {/* FIXME store 사용 & 로딩컴포넌트 */}
          Loading...
        </h1>
      </>
    )
  );
}

Room.propTypes = {
  id: PropTypes.string.isRequired,
};

export default React.memo(Room);
