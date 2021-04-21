import { unwrapResult } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateUserData, userSelector } from "../reducers/userSlice";

export default function useMyProfile() {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    name: user.name,
    description: user.description,
    photoURL: user.photoURL,
    musicURL: user.musicURL,
  });

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
