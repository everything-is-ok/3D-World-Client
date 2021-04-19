import firebase from "../config/firebase";

const API = {};

const SERVER_PORT = process.env.REACT_APP_SERVER_URL;

API.onSocialLogin = async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const googleUserData = await firebase.auth().signInWithPopup(provider);

    let response = await fetch(`${SERVER_PORT}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: googleUserData.user.email,
        name: googleUserData.user.displayName,
        photoURL: googleUserData.user.photoURL,
      }),
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
