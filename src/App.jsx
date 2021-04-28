import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

import { getUserByToken, userIdSelector } from "./reducers/userSlice";
import Layout from "./components/shared/Layout";
import THEME from "./constants/theme";
import { connectSocket, disconnectSocket } from "./utils/socket";

function App() {
  const userId = useSelector(userIdSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) {
      dispatch(getUserByToken());
      return;
    }

    connectSocket();
    return () => disconnectSocket();
  }, [userId]);

  return (
    <ThemeProvider theme={THEME}>
      <Router>
        {userId ? (
          <>
            <Header />
            <Switch>
              <Route exact path="/world">
                <World />
              </Route>
              <Route exact path="/room/:userId">
                <Layout>
                  <Main />
                </Layout>
              </Route>
              <Redirect to={`/room/${userId}`} />
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
