import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Header from "./components/Header";
import Welcome from "./components/Welcome";
import Main from "./components/Main";
import { getUserByToken, userSelector } from "./reducers/userSlice";

import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  useEffect(() => {
    if (!user) {
      dispatch(getUserByToken());
    }
  }, [user]);

  return (
<<<<<<< HEAD
    <>
      <Header />
      <Main />
    </>
=======
    <Router>
      {user ? (
        <>
          <Header />
          <Switch>
            <Route exact path="/room/:userId" component={Main} />
            <Redirect to={`/room/${user._id}`} />
          </Switch>
        </>
      ) : (
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Redirect to="/" />
        </Switch>
      )}
    </Router>
>>>>>>> 4a43d726154bcef751a83d84f4618b34c0886a79
  );
}

export default App;
