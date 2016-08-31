import {INCREMENT_COUNTER} from "../actions/IncrementCounter";

const secondElapsed = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1;
    default:
      return state;
  }
};

export default secondElapsed;
