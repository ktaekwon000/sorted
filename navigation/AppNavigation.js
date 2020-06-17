import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { Provider as DiaryProvider } from "../config/DiaryContext";
import { createAppContainer } from "react-navigation";
import { Button } from "react-native-elements";
import SettingsScreen from "../screens/app/SettingsScreen";
import DiaryScreen from "../screens/app/DiaryScreen";
import NewEntryScreen from "../screens/app/NewEntryScreen";
import DiaryEntryScreen from "../screens/app/DiaryEntryScreen";
import EditScreen from "../screens/app/EditScreen";
import StatsScreen from "../screens/app/StatsScreen";
import ContactsScreen from "../screens/app/ContactsScreen";

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
          marginLeft: 85,
        },
        headerRight: (
          <Button
            title="New Entry"
            type="clear"
            containerStyle={{ margin: 6 }}
            titleStyle={{ fontSize: 14 }}
            onPress={() => navigation.navigate("NewEntry")}
          />
        ),
        headerLeft: () => (
          <View style={{ flexDirection: "row" }}>
            <Button
              title="Settings"
              type="clear"
              containerStyle={{ marginLeft: 6 }}
              titleStyle={{ fontSize: 14 }}
              onPress={() => navigation.navigate("Settings")}
            />
            <Button
              title="Helplines"
              type="clear"
              containerStyle={{ marginLeft: 6 }}
              titleStyle={{ fontSize: 14 }}
              onPress={() => navigation.navigate("Contacts")}
            />
          </View>
        ),
      }),
    },
    NewEntry: {
      screen: NewEntryScreen,
      navigationOptions: { title: "New entry" },
    },
    DiaryEntry: {
      screen: DiaryEntryScreen,
    },
    Edit: {
      screen: EditScreen,
    },
    Stats: {
      screen: StatsScreen,
      navigationOptions: { title: "Your stats" },
    },
    Contacts: {
      screen: ContactsScreen,
      navigationOptions: { title: "Helplines" },
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
