import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  browserHistory
} from "react-router-dom";
import { Provider } from "react-redux";
import { hot } from "react-hot-loader";
import { syncHistoryWithStore, routerReducer } from "react-router-redux";
import Dashboard from "./components/Dashboard/Dashboard";
import Landing from "./components/Layout/Landing";
import store from "./store";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "./css/style.css";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
          </Switch>
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default hot(module)(App);
