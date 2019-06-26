import { createStackNavigator } from "react-navigation";
import SCREENS from "../enums/screensEnum";
import Dashboard from "../screens/dashboard";
import NewPost from "../screens/new_post";
import PostView from "../screens/post_view";

export default createStackNavigator({
  [SCREENS.DASHBOARD]: Dashboard,
  [SCREENS.NEW_POST]: NewPost,
  [SCREENS.POST_VIEW]: PostView
});
