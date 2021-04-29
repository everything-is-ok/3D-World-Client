import firebase from "../config/firebase";
import fetchData from "../utils/fetchData";

const API = {};

API.onSocialLogin = async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const googleUserData = await firebase.auth().signInWithPopup(provider);

    const response = await fetchData("POST", "/user", {
      email: googleUserData.user.email,
      name: googleUserData.user.displayName,
      photoURL: googleUserData.user.photoURL,
    });

    console.log("💦 response", response);
    return response;
  } catch (err) {
    console.log("💥err ", err);
    throw new Error(err.message);
  }
};

export default API;
