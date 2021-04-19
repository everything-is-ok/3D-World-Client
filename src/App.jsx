import React from "react";
import { useSelector } from "react-redux";

import Header from "./components/Header";
import Welcome from "./components/Welcome";
import Main from "./components/Main";
import { userSelector } from "./reducers/userSlice";

function App() {
  // TODO: DELETE THIS !
  const user = useSelector(userSelector);

  return (
    <>
      {user ? (
        <>
          <Header />
          <Main />
        </>
      ) : (
        <Welcome />
      )}
    </>
  );
}

export default App;
