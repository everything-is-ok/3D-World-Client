import firebase from "../config/firebase";

const API = {};

const SERVER_PORT = process.env.REACT_APP_SERVER_URL;

API.onSocialLogin = async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const googleUserData = await firebase.auth().signInWithPopup(provider);

    const response = await fetch(`${SERVER_PORT}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: googleUserData.user.email,
        name: googleUserData.user.displayName,
        photo: googleUserData.user.photoURL,
      }),
    });

    // 객체로 잘 분해되는지 확인 (thunk내에서)
    return response.json();
  } catch (err) {
    console.log(err.message);
  }
};

export default API;
