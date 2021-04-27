import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getMailList } from "../reducers/mailSlice";

// NOTE: 사용하는 곳에서 객체를 주지 않고 있어서, 항상 undefined
function useMailbox({ isLoggedInUser }) {
  const dispatch = useDispatch();
  const [mailboxId, setMailboxId] = useState(null);
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    if (!isLoggedInUser) return;

    dispatch(getMailList());
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
