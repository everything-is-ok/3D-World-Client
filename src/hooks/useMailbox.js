import { useState } from "react";
import { useDispatch } from "react-redux";

import { postMail, deleteMailList, deleteMailItem } from "../reducers/mailSlice";

function useMailbox() {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  function handleFormSubmit(mailboxId) {
    dispatch(postMail(mailboxId, content));
  }

  function handleInputChange(e) {
    setContent(e.target.value);
  }

  // TODO ADD deleteItem
  function handleDeleteMailList() {
    dispatch(deleteMailList());
  }

  const handleDeleteMailItem = dispatch(deleteMailItem);

  return {
    content,
    handleFormSubmit,
    handleInputChange,
    handleDeleteMailItem,
    handleDeleteMailList,
  };
}

export default useMailbox;
