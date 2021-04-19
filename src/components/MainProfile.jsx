import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import styled from "styled-components";
import PropTypes from "prop-types";

import Profile from "./shared/Profile";
import ProfileForm from "./shared/ProfileForm";
import { updateUserData, userSelector } from "../reducers/userSlice";

const Container = styled.div`
  width: 20%;
  height: 100%;

  // NOTE: 사이즈 확인용 border
  border: 2px solid black;
`;

// NOTE: 로그인한 유저의 정보가 아닌, 방 주인의 정보를 보여준다.
// NOTE: 유저 아이디(_id)를 prop으로 받아서, 서버에서 해당 유저의 정보를 받아온다.
// TODO: 유저 정보 수정 기능.
function MainProfile() {
  const dispatch = useDispatch();
  const realuser = useSelector(userSelector);

  const id = realuser._id;

  const [isEditing, setIsEditing] = useState(false);

  const [data, setData] = useState({
    name: realuser.name,
    description: realuser.description,
    photoURL: realuser.photoURL,
    musicURL: realuser.musicURL,
  });

  useEffect(() => {
    async function getUserProfile() {
      try {
        let response = await fetch(`http://localhost:5000/user/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        response = await response.json();

        if (response.ok) {
          const { data: user } = response;

          setData({
            name: user.name,
            description: user.description,
            photoURL: user.photoURL,
            musicURL: user.musicURL,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }

    getUserProfile();
  }, []);

  function handleInputChange(e) {
    const { value, name } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const actionResult = await dispatch(updateUserData(data));
      unwrapResult(actionResult);
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
    // try {
    //   await fetch("http://localhost:5000/user", {
    //     method: "PATCH",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     credentials: "include",
    //     body: JSON.stringify({
    //       ...data,
    //     }),
    //   });

    //   setIsEditing(false);
    // } catch (err) {
    //   console.log(err);
    // }
  }

  return (
    <Container>
      {isEditing ? (
        <ProfileForm
          name={data.name}
          description={data.description}
          photoURL={data.photoURL}
          musicURL={data.musicURL}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        <>
          <Profile
            name={data.name}
            description={data.description}
            photoURL={data.photoURL}
            musicURL={data.musicURL}
          />
          <button
            type="button"
            onClick={() => setIsEditing(true)}
          >
            EDIT
          </button>
        </>
      )}

    </Container>
  );
}

// MainProfile.propTypes = {
//   id: PropTypes.string.isRequired,
// };

export default MainProfile;
