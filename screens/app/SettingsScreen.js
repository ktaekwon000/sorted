import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { withFirebaseHOC } from "../../config/Firebase";
import { createStackNavigator } from "react-navigation-stack";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { TouchableOpacity } from "react-native-gesture-handler";

function Settings({ navigation, firebase }) {
  const [ready, setReady] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");

  async function handleSignout() {
    try {
      await firebase.signOut();
      navigation.navigate("Auth");
    } catch (error) {
      console.warn(error);
    }
  }

  async function retrieveUser() {
    try {
      const user = await firebase.retrieveUser();
      setName(user.displayName);
      setEmail(user.email);
      setUid(user.uid);
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => {
    retrieveUser();
    setReady(true);
  }, []);

  return !ready ? (
    <View style={styles.container}>
      <Text>loading...</Text>
      <Text>
        Please check your internet connection if this is taking too long
      </Text>
    </View>
  ) : (
    <View style={styles.container}>
      <Text>Welcome! You are {name}</Text>
      <Text>Your email is {email}</Text>
      <Text>
        {"\n"}The following information is only for debugging purposes:
      </Text>
      <Text>uid: {uid}</Text>
      <Button
        title="Signout"
        onPress={handleSignout}
        titleStyle={{
          color: "#F57C00",
        }}
        type="clear"
      />
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            "https://www.digitaltrends.com/android/how-to-turn-off-notifications-in-android/"
          )
        }
      >
        <Text style={{ textAlign: "center", margin: 8 }}>
          If you wish to turn off notifications for this app, tap this text to
          be directed to a website with instructions.
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const SettingsWithFirebase = withFirebaseHOC(Settings);

const SettingsNavigation = createStackNavigator(
  {
    Settings: {
      screen: SettingsWithFirebase,
      navigationOptions: ({ navigation }) => ({
        title: "Account Settings",
        headerLeft: (
          <View style={{ flexDirection: "row" }}>
            <Button
              icon={<Ionicons name="md-menu" size={24} color="black" />}
              type="clear"
              containerStyle={{ marginLeft: 6 }}
              titleStyle={{ fontSize: 14 }}
              onPress={() => navigation.openDrawer()}
            />
          </View>
        ),
        headerRight: (
          <Button
            title="Contact developers"
            type="clear"
            containerStyle={{ marginRight: 6 }}
            titleStyle={{ fontSize: 14 }}
            onPress={() => Linking.openURL("mailto: ktaekwon000@gmail.com")}
          />
        ),
      }),
    },
  },
  {
    initialRouteName: "Settings",
  }
);

export default SettingsNavigation;
