import { persistCombineReducers } from "redux-persist";
import ReduxPersistConfig from "./reduxPersist";
import configureStore from "./createStore";
import { reducer as chat } from "./chatReducer";

export const reducers = persistCombineReducers(ReduxPersistConfig.storeConfig, {
  chat
});

export default () => {
  let { store } = configureStore(reducers);

  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(reducers);
    });
  }

  return store;
};
