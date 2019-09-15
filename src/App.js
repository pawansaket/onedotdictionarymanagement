import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { hot } from "react-hot-loader";
const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));
const Landing = lazy(() => import("./components/Layout/Landing"));

import store from "./store";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "./css/style.less";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Landing} />
            </Switch>
            <Switch>
              <Route exact path="/dashboard" component={Dashboard} />
            </Switch>
          </Suspense>
        </Router>
      </Provider>
    );
  }
}

export default hot(module)(App);
