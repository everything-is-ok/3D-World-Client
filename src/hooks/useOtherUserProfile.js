import { useEffect, useState } from "react";

import fetchData from "../utils/fetchData";

function useOtherUserProfile(id) {
  const [userData, setUserData] = useState({
    name: "",
    description: "",
    photoURL: "",
    musicURL: "",
  });

  useEffect(() => {
    async function getUserProfile() {
      try {
        const user = await fetchData("GET", `/user/${id}`);

        setUserData({
          name: user.name,
          description: user.description,
          photoURL: user.photoURL,
          musicURL: user.musicURL,
        });
      } catch (err) {
        throw new Error(err.message);
      }
    }

    getUserProfile();
  }, [id]);

  return {
    userData,
  };
}

export default useOtherUserProfile;
