import firebase from "../config/firebase";
import fetchData from "../utils/fetchData";

const API = {};

API.onSocialLogin = async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const googleUserData = await firebase.auth().signInWithPopup(provider);

    console.log("💢", googleUserData.user.email);

    const response = await fetchData("POST", "/user", {
      email: googleUserData.user.email,
      name: googleUserData.user.displayName,
      photoURL: googleUserData.user.photoURL,
    });

    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export default API;
