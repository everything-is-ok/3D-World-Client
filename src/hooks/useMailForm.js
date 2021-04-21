import { useState } from "react";
import { useDispatch } from "react-redux";

import { postMail, deleteMailList, deleteMailItem } from "../reducers/mailSlice";

function useMailForm() {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  function handleFormSubmit(id) {
    dispatch(postMail(id, content));
  }

  function handleInputChange(e) {
    setContent(e.target.value);
  }

  return {
    content,
    handleFormSubmit,
    handleInputChange,
  };
}

export default useMailForm;
