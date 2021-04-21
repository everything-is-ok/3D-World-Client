import { useState } from "react";
import { useDispatch } from "react-redux";

import { postMail, deleteMailList, deleteMailItem } from "../reducers/mailSlice";

function useMailbox() {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [mailboxId, setMailboxId] = useState(null);
  const [openMailbox, setOpenMailbox] = useState(false);

  function toggle() {
    setOpenMailbox((prev) => !prev);
  }

  function handleClickMailbox(id) {
    setMailboxId(id);
    setOpenMailbox((prev) => !prev);
  }

  function handleFormSubmit(id) {
    dispatch(postMail(id, content));
  }

  function handleInputChange(e) {
    setContent(e.target.value);
  }

  function handleDeleteMailList() {
    dispatch(deleteMailList());
  }

  function handleDeleteMailItem() {
    dispatch(deleteMailItem());
  }

  return {
    content,
    mailboxId,
    openMailbox,
    toggle,
    handleClickMailbox,
    handleFormSubmit,
    handleInputChange,
    handleDeleteMailItem,
    handleDeleteMailList,
  };
}

export default useMailbox;
