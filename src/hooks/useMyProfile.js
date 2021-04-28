import { unwrapResult } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateUserData, userSelector } from "../reducers/userSlice";

function useMyProfile() {
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
      const actionResult = await dispatch(updateUserData(userData));
      unwrapResult(actionResult);
      setIsEditing(false);
    } catch (err) {
      setIsEditing(true);
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

export default useMyProfile;
