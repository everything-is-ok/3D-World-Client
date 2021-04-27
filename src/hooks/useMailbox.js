import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getFurniture } from "../reducers/furnitureSlice";

function useMailbox({ isLoggedInUser }) {
  const dispatch = useDispatch();
  const [mailboxId, setMailboxId] = useState(null);
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    if (!isLoggedInUser) return;

    dispatch(getFurniture());
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
