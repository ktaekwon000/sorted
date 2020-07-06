import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { withNavigation } from "react-navigation";

const EmojiComponent = ({ emoji, emotion, navigation }) => (
  <Button
    containerStyle={{ flex: 1, margin: 10, marginHorizontal: 30 }}
    title={emoji}
    type="outline"
    titleStyle={{ fontSize: 36, margin: 10 }}
    onPress={() =>
      navigation.navigate("Emotions", { emotion: { emoji, emotion } })
    }
  />
);

const styles = StyleSheet.create({});

export default withNavigation(EmojiComponent);
