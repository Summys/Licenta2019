import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
export default rootReducer => {
  const store = createStore(rootReducer, applyMiddleware(logger));
  return {
    store
  };
};
