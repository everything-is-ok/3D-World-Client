import { useState } from "react";
import { useDispatch } from "react-redux";

import { postMail, deleteMailList, deleteMailItem } from "../reducers/mailSlice";

function useMailbox() {
  const dispatch = useDispatch();

  // 남의방
  const [content, setContent] = useState("");

  // NOTE mailboxId, content
  function handleFormSubmit(mailboxId) {
    dispatch(postMail(mailboxId, content));
  }

  function handleInputChange(e) {
    setContent(e.target.value);
  }

  // 내방
  // TODO ADD deleteItem
  const handleDeleteMailList = dispatch(deleteMailList);
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
