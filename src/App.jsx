import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Header from "./components/Header";
import Welcome from "./components/Welcome";
import Main from "./components/Main";
import World from "./components/World";

import { getUserByToken, userSelector } from "./reducers/userSlice";
import Layout from "./components/shared/Layout";
import THEME from "./constants/theme";
import { connectSocket, disconnectSocket } from "./utils/socket";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  useEffect(() => {
    if (!user) {
      dispatch(getUserByToken());
      return;
    }

    connectSocket();
    return () => disconnectSocket();
  }, [user]);

  return (
    <ThemeProvider theme={THEME}>
      <Router>
        {user ? (
          <>
            <Header />
            <Switch>
              <Route exact path="/world">
                <World user={user} />
              </Route>
              <Route exact path="/room/:userId">
                <Layout>
                  <Main />
                </Layout>
              </Route>
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
    </ThemeProvider>
  );
}

export default App;
