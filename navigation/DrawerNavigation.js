import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import SafeAreaView from "react-native-safe-area-view";
import { DrawerItems } from "react-navigation-drawer";
import { withFirebaseHOC } from "../config/Firebase";
import { Provider as DiaryProvider } from "../config/DiaryContext";
import DiaryScreens from "./AppNavigation";
import ContactsScreen from "../screens/app/ContactsScreen";
import StatsScreen from "../screens/app/StatsScreen";
import SettingsScreen from "../screens/app/SettingsScreen";

const CustomDrawerContentComponent = ({ firebase, ...props }) => {
  const [name, setName] = useState("loading...");
  const [email, setEmail] = useState("loading...");
  async function getUserInfo() {
    const user = await firebase.retrieveUser();
    setName(user.displayName);
    setEmail(user.email);
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <ScrollView>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: "always", horizontal: "never" }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 30,
            marginVertical: 10,
            // backgroundColor: "#DCDCDC",
          }}
        >
          <Text>
            {name
              ? `Welcome ${name}.`
              : `Your account is in the process of being set up.
You may have to restart the app for your name to show here.`}
          </Text>
          <Text>Have a nice day today 😊</Text>
          {/* <Text>{`${email}`}</Text> */}
        </View>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
  );
};

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
    contentComponent: withFirebaseHOC(CustomDrawerContentComponent),
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const AppContainer = createAppContainer(DrawerNavigation);

export default () => (
  <DiaryProvider>
    <AppContainer />
  </DiaryProvider>
);
