import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import generateStore from "./redux/store";

import CluufApp from "./KometApp";
import "./i18next";

const store = generateStore();

ReactDOM.render(
  <Provider store={store}>
    <CluufApp />
  </Provider>,
  document.getElementById("spa-root")
);
