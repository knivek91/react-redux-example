import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import configureStore from "./redux/store";
import * as serviceWorker from "./serviceWorker";
import App from "./App";

render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
