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
              <span className="nav-link">Post & Comments</span>
            </li>
          </ul>
        </nav>
        <br />
        <div className="container">
          <Router>
            <Switch>
              {/* use `component` to use the params from `match` */}
              <Route exact path="/comments/:id" component={Comments} />
              <Route path="/">
                <Post />
              </Route>
            </Switch>
          </Router>
        </div>
      </>
    );
  }
}
export default App;
