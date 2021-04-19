import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

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
          <Router>
            <Header />
            <Switch>
              {/* TODO: route 가를 필요가 없을수도 */}
              <Route exact path="/">
                <Main />
              </Route>
              {/* TODO: room/userid???? */}
              <Route exact path="/room/:otherUserId">
                <Main />
              </Route>
            </Switch>
          </Router>
        </>
      ) : (
        <Welcome />
      )}
    </>
  );
}

export default App;
