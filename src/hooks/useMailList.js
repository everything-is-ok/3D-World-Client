import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../reducers/itemSlice";

import { deleteMailList, deleteMailItem, mailSelector } from "../reducers/mailSlice";
import fetchData from "../utils/fetchData";

function useMailList({ isLoggedInUser }) {
  // ㄷㅏ른 사람 아이디가 날아오면 그 사람 아이디로 보내야한다
  const dispatch = useDispatch();
  const mails = useSelector(mailSelector);
  const [mailList, setMailList] = useState(mails);

  useEffect(() => {
    if (!isLoggedInUser) return; // 타인이면 안불러옴

    dispatch(getItems());
  }, [isLoggedInUser]);

  const [content, setContent] = useState("");
  const [mailboxId, setMailboxId] = useState(null);
  const [isToggled, setIsToggled] = useState(false);

  function handleFormSubmit(e) {
    e.preventDefault();

    fetchData(
      "POST",
      `/mailbox/mail/${mailboxId}`,
      { content },
    );

    setIsToggled(false);
  }

  function handleInputChange(e) {
    setContent(e.target.value);
  }

  function toggle() {
    setIsToggled((prev) => !prev);
  }

  function handleClickMailbox(id) {
    setMailboxId(id);
    setIsToggled((prev) => !prev);
  }

  function handleDeleteMailList() {
    dispatch(deleteMailList());
  }

  function handleDeleteMailItem(mailId) {
    dispatch(deleteMailItem(mailId));
  }

  return {
    mailList,
    content,
    mailboxId,
    isToggled,
    toggle,
    handleFormSubmit,
    handleInputChange,
    handleClickMailbox,
    handleDeleteMailList,
    handleDeleteMailItem,
  };
}

export default useMailList;
