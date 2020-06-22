import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import { Provider as DiaryProvider } from "../config/DiaryContext";
import DiaryScreens from "./AppNavigation";
import ContactsScreen from "../screens/app/ContactsScreen";
import StatsScreen from "../screens/app/StatsScreen";
import SettingsScreen from "../screens/app/SettingsScreen";

const DrawerNavigation = createDrawerNavigator(
  {
    Diary: {
      screen: DiaryScreens,
      navigationOptions: {
        drawerIcon: <Ionicons name="md-bookmarks" size={24} />,
      },
    },
    Helplines: {
      screen: ContactsScreen,
      navigationOptions: {
        drawerIcon: <Ionicons name="md-call" size={24} />,
      },
    },
    Stats: {
      screen: StatsScreen,
      navigationOptions: {
        drawerIcon: <Ionicons name="md-stats" size={24} />,
      },
    },
    Account: {
      screen: SettingsScreen,
      navigationOptions: {
        title: "Account Settings",
        drawerIcon: <Ionicons name="md-person" size={24} />,
      },
    },
  },
  {
    initialRouteName: "Diary",
  }
);

const AppContainer = createAppContainer(DrawerNavigation);

export default () => (
  <DiaryProvider>
    <AppContainer />
  </DiaryProvider>
);
