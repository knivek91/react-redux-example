import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Post from "./post";
import Comments from "./comment";
class App extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-sm bg-light">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#">
                React Redux
              </a>
            </li>
          </ul>
        </nav>
        <br />
        <div className="container">
          <Router>
            <Switch>
              {/* can use hooks */}
              <Route exact path="/">
                <Post />
              </Route>
              {/* cannot use hooks */}
              <Route exact path="/comments/:id" component={Comments} />
            </Switch>
          </Router>
        </div>
      </>
    );
  }
}
export default App;
