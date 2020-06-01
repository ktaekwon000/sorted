import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { Provider as BlogProvider } from "../config/BlogContext";
import SettingsScreen from "../screens/app/SettingsScreen";
import BlogListScreen from "../screens/app/BlogListScreen";
import { createAppContainer } from "react-navigation";

const AppNavigation = createStackNavigator(
  {
    Settings: {
      screen: SettingsScreen,
      navigationOptions: { title: "Settings" },
    },
    BlogList: {
      screen: BlogListScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Your entries",
        headerTitleStyle: {
          textAlign: "center",
          flex: 1,
        },
        headerRight: (
          <TouchableOpacity
            style={{ marginRight: 13 }}
            onPress={() => alert("new entry")}
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
  },

  {
    initialRouteName: "BlogList",
    defaultNavigationOptions: {
      title: "placeholder text",
    },
  }
);

const AppContainer = createAppContainer(AppNavigation);

export default () => (
  <BlogProvider>
    <AppContainer />
  </BlogProvider>
);
