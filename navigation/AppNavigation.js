import { createStackNavigator } from "react-navigation-stack";
import SettingsScreen from "../screens/app/SettingsScreen";

const AppNavigation = createStackNavigator(
  {
    Settings: {
      screen: SettingsScreen,
      navigationOptions: { title: "Settings" },
    },
  },
  {
    initialRouteName: "Settings",
    defaultNavigationOptions: {
      title: "placeholder text",
    },
  }
);

export default AppNavigation;
