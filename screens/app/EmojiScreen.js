import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-elements";
import EmojiComponent from "../../components/EmojiComponent";

const EmojiScreen = ({ navigation }) => {
  const emotions = navigation.getParam("emotions");

  return (
    <View style={{ flex: 1 }}>
      <Text h4 style={{ textAlign: "center", marginTop: 20, flex: 1 }}>
        Pick the emoji which you think is appropriate for this entry :)
      </Text>
      <EmojiComponent
        emoji={emotions.emoji0}
        emotion={emotions.emoji0_emotion}
      />
      <EmojiComponent
        emoji={emotions.emoji1}
        emotion={emotions.emoji1_emotion}
      />
      <EmojiComponent
        emoji={emotions.emoji2}
        emotion={emotions.emoji2_emotion}
      />
      <EmojiComponent
        emoji={emotions.emoji3}
        emotion={emotions.emoji3_emotion}
      />
      <EmojiComponent
        emoji={emotions.emoji4}
        emotion={emotions.emoji4_emotion}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default EmojiScreen;