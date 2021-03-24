import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingManager from "./LandingManager";
import EditLanding from "./EditLanding";

const LandingPage = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/manager`} component={LandingManager} />
    <Route path={`${match.url}/edit`} component={EditLanding} />
  </Switch>
);

export default LandingPage;
