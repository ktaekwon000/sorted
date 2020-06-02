import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { Provider as DiaryProvider } from "../config/DiaryContext";
import SettingsScreen from "../screens/app/SettingsScreen";
import DiaryScreen from "../screens/app/DiaryScreen";
import NewEntryScreen from "../screens/app/NewEntryScreen";
import { createAppContainer } from "react-navigation";

const AppNavigation = createStackNavigator(
  {
    Settings: {
      screen: SettingsScreen,
      navigationOptions: { title: "Settings" },
    },
    Diary: {
      screen: DiaryScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Your entries",
        headerTitleStyle: {
          textAlign: "center",
          flex: 1,
        },
        headerRight: (
          <TouchableOpacity
            style={{ marginRight: 13 }}
            onPress={() => navigation.navigate("NewEntry")}
          >
            <Text style={{ color: "#007AFF" }}>New Post</Text>
          </TouchableOpacity>
        ),
        headerLeft: () => (
          <TouchableOpacity
            style={{ marginLeft: 13 }}
            onPress={() => navigation.navigate("Settings")}
          >
            <Text style={{ color: "#007AFF" }}>Settings</Text>
          </TouchableOpacity>
        ),
      }),
    },
    NewEntry: {
      screen: NewEntryScreen,
      navigationOptions: { title: "New entry" },
    },
  },

  {
    initialRouteName: "Diary",
    defaultNavigationOptions: {
      title: "placeholder text",
    },
  }
);

const AppContainer = createAppContainer(AppNavigation);

export default () => (
  <DiaryProvider>
    <AppContainer />
  </DiaryProvider>
);
