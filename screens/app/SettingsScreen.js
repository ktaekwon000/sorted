import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { withFirebaseHOC } from "../../config/Firebase";

function Settings({ navigation, firebase }) {
  // const [ready, setReady] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");
  const [createdDate, setCreatedDate] = useState(new Date(0));

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
      // janky hack, data() should be moved into firebase.js
      setCreatedDate(
        new Date(
          (await firebase.retrieveUserDocument(user)).data().createdDate
            .seconds * 1000
        )
      );
      console.log(createdDate);
      setName(user.displayName);
      setEmail(user.email);
      setUid(user.uid);
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => {
    retrieveUser();
    // setReady(true);
  }, []);

  return !name ? (
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
      <Text>Account creation date: {createdDate.toLocaleString("en-GB")}</Text>
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
