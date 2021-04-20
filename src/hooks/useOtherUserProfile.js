import { useEffect, useState } from "react";

import fetchData from "../utils/fetchData";

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
        // NOTE 여기에서 이미 response.data 받도록 해놨는데, 수정 필요한지 확인필요
        const user = await fetchData("GET", `/${id}`);

        setUserData({
          name: user.name,
          description: user.description,
          photoURL: user.photoURL,
          musicURL: user.musicURL,
        });
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
