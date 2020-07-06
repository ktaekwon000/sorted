import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";

const EmotionsScreen = ({ navigation }) => {
  const emotion = navigation.getParam("emotion");

  return (
    <View>
      <Text style={{ textAlign: "center", marginTop: 10, fontSize: 20 }}>
        We think that you're feeling...
      </Text>
      <Text h4 style={{ textAlign: "center" }}>
        {emotion.emoji} {emotion.emotion}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default EmotionsScreen;
