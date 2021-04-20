import firebase from "../config/firebase";
import fetchData from "../utils/fetchData";

const API = {};

API.onSocialLogin = async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const googleUserData = await firebase.auth().signInWithPopup(provider);

    let response = await fetchData("POST", "/user", {
      email: googleUserData.user.email,
      name: googleUserData.user.displayName,
      photoURL: googleUserData.user.photoURL,
    });

    response = await response.json();
    if (response.ok) {
      return response.data;
    }

    // NOTE: 에러핸들링, 어찌할지 멘토님께 질문
    throw new Error(response.error.message);
  } catch (err) {
    throw new Error(err);
  }
};

export default API;
