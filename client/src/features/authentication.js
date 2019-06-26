import { createStackNavigator } from "react-navigation";
import SCREENS from "../enums/screensEnum";
import Login from "../screens/login";

export default createStackNavigator(
  { [SCREENS.LOGIN]: Login },
  {
    headerMode: "none",
    gesturesEnabled: false,
    cardOverlayEnabled: true,
    transparentCard: true
  }
);
