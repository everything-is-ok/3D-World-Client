import { useState } from "react";
import { useDispatch } from "react-redux";

import { deleteMailList, postMail } from "../reducers/mailSlice";

// NOTE 내 방이면 delete, 남의 방이면 submit 뱉어야함
// NOTE 렌더링될때 roomId 들어오고 mailbox 클릭하면
function useMailbox() {
  const dispatch = useDispatch();

  // 남의방
  const [content, setContent] = useState("");

  function handleFormSubmit(e) {
    e.preventDefault();
    dispatch(postMail(content));
  }

  function handleInputChange(e) {
    setContent(e.target.value);
  }

  // 내방
  // TODO ADD deleteItem
  const handleDeleteMailList = dispatch(deleteMailList);

  return {
    handleFormSubmit,
    handleInputChange,
    handleDeleteMailList,
  };
}

export default useMailbox;
