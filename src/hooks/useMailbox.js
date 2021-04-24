import { useEffect, useState } from "react";
import { getItems } from "../reducers/itemSlice";

function useMailbox({ isLoggedInUser }) {
  // ㄷㅏ른 사람 아이디가 날아오면 그 사람 아이디로 보내야한다
  const [mailboxId, setMailboxId] = useState(null);
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    if (!isLoggedInUser) return; // 타인이면 안불러옴

    // 내꺼면 계속 불러온다
    dispatch(getItems());
  }, [isLoggedInUser]);


  function handleClickMailbox(id) {
    setMailboxId(id);
    setIsToggled((prev) => !prev);
  }

  function toggle() {
    setIsToggled((prev) => !prev);
  }

  return {
    mailboxId,
    isToggled,
    toggle,
    handleClickMailbox,
  };
}

export default useMailbox;
