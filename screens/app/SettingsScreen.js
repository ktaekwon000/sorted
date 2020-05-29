import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { withFirebaseHOC } from "../../config/Firebase";

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
      <Text></Text>
      <Button
        title="Signout"
        onPress={handleSignout}
        titleStyle={{
          color: "#F57C00",
        }}
        type="clear"
      />
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

export default withFirebaseHOC(Settings);
