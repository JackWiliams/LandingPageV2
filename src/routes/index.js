import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./LandingPage";
import Templates from "./Templates";

const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}landing-pages`} component={LandingPage} />
      <Route path={`${match.url}templates`} component={Templates} />
    </Switch>
  </div>
);

export default App;
