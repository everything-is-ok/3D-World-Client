import { useEffect, useState } from "react";

export default function useOtherUserProfile(id) {
  const [userData, setUserData] = useState({
    name: "",
    description: "",
    photoURL: "",
    musicURL: "",
  });

  // NOTE: fetch/ 다른사람의 방에 갈 때 받는 유저정보
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

          setUserData({
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
  }, [id]);

  return {
    userData,
  };
}
