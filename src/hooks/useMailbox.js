import { useState } from "react";
import { useDispatch } from "react-redux";

import { deleteMailList, deleteMailItem } from "../reducers/mailSlice";
import fetchData from "../utils/fetchData";

function useMailbox() {
  const dispatch = useDispatch();
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

export default useMailbox;
