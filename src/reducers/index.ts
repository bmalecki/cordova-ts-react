import { combineReducers } from "redux";
import secondElapsed from "./secondElapsed";
import { routerReducer } from "react-router-redux";

export default combineReducers({
  secondElapsed,
  routing: routerReducer
});
