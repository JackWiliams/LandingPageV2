import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingManager from "./LandingManager";
import EditLanding from "./EditLanding";
import Templates from "./Templates";

const LandingPage = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/manager`} component={LandingManager} />
    <Route path={`${match.url}/edit`} component={EditLanding} />
    <Route path={`${match.url}/templates`} component={Templates} />
  </Switch>
);

export default LandingPage;
