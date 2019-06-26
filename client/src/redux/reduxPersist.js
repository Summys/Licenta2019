import {
  seamlessImmutableReconciler,
  seamlessImmutableTransformer
} from "redux-persist-seamless-immutable";
import AsyncStorage from "@react-native-community/async-storage";

const REDUX_PERSIST = {
  active: true,
  reducerVersion: "54.0",
  storeConfig: {
    key: "root",
    storage: AsyncStorage,
    stateReconciler: seamlessImmutableReconciler,
    transforms: [seamlessImmutableTransformer({})]
  }
};

export default REDUX_PERSIST;
