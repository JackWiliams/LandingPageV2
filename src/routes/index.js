import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./LandingPage";
import UserManager from "./UserManager";

var roleUser = null;
const roles = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")).roles
  : null;

if (roles && roles[0]) {
  roleUser = roles[0];
}

const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      {roleUser === "ROLE_USER" && (
        <Route path={`${match.url}landing-pages`} component={LandingPage} />
      )}
      {roleUser === "ROLE_ADMIN" && (
        <Route path={`${match.url}user-manager`} component={UserManager} />
      )}
    </Switch>
  </div>
);

export default App;
