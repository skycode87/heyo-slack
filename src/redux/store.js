import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import user from "./user";
import root from "./root";
import master from "./master";
import session from "./session";
import pack from "./pack";
import plan from "./plan";
import app from "./app";
import trans from "./trans";
import guest from "./guest";
import calendar from "./calendar";
import instance from "./instance";
import profile from "./profile";
import bucket from "./bucket";

const rootReducer = combineReducers({
  user,
  root,
  master,
  session,
  pack,
  plan,
  app,
  trans,
  guest,
  calendar,
  instance,
  profile,
  bucket,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
  return store;
}
