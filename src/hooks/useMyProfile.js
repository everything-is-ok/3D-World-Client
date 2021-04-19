import { unwrapResult } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserData } from "../reducers/userSlice";

export default function useMyProfile() {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    description: "",
    photoURL: "",
    musicURL: "",
  });

  // NOTE: fetch/ 다른사람의 방에 갈 때 받는 유저정보

  function handleInputChange(e) {
    const { value, name } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      // TODO: await 지워도 된다는 것 같다는데 확인 필요.
      const actionResult = await dispatch(updateUserData(userData));
      unwrapResult(actionResult);
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
  }

  return {
    userData,
    isEditing,
    setIsEditing,
    handleFormSubmit,
    handleInputChange,
  };
}
