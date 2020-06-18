import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { Provider as DiaryProvider } from "../config/DiaryContext";
import DiaryScreens from "./AppNavigation";
import ContactsScreen from "../screens/app/ContactsScreen";
import StatsScreen from "../screens/app/StatsScreen";

const DrawerNavigation = createDrawerNavigator(
  {
    DiaryScreens: { screen: DiaryScreens },
    Contacts: { screen: ContactsScreen },
    Stats: {
      screen: StatsScreen,
      navigationOptions: { title: "Your stats" },
    },
  },
  {
    initialRouteName: "DiaryScreens",
  }
);

const AppContainer = createAppContainer(DrawerNavigation);

export default () => (
  <DiaryProvider>
    <AppContainer />
  </DiaryProvider>
);
