import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./LandingPage";

const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}landing-pages`} component={LandingPage} />
    </Switch>
  </div>
);

export default App;
