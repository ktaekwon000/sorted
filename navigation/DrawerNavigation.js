import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { Provider as DiaryProvider } from "../config/DiaryContext";
import DiaryScreens from "./AppNavigation";
import ContactsScreen from "../screens/app/ContactsScreen";
import StatsScreen from "../screens/app/StatsScreen";

const DrawerNavigation = createDrawerNavigator(
  {
    Diary: { screen: DiaryScreens },
    Helplines: { screen: ContactsScreen },
    Stats: {
      screen: StatsScreen,
      navigationOptions: { title: "Stats" },
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
