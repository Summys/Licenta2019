import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Retrospect from "./retrospect";
import Authentication from "./authentication";

export const ScreenNavigator1 = createAppContainer(
  createSwitchNavigator({
    Authentication,
    Retrospect
  })
);
export const ScreenNavigator2 = createAppContainer(
  createSwitchNavigator({
    Retrospect,
    Authentication
  })
);
