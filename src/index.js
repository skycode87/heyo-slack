import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import generateStore from "./redux/store";

import HeyoApp from "./HeyoApp";
import "./i18next";

const store = generateStore();

ReactDOM.render(
  <Provider store={store}>
    <HeyoApp />
  </Provider>,
  document.getElementById("spa-root")
);
