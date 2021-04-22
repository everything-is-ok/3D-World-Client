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

function App() {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  useEffect(() => {
    if (!user) {
      dispatch(getUserByToken());
    }
  }, [user]);

  return (
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
          <Route path="/" component={Welcome} />
          {/* <Redirect to="/" /> */}
        </Switch>
      )}
    </Router>
  );
}

export default App;
