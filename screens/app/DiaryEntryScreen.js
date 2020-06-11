import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Button, Text } from "react-native-elements";
import { Context as DiaryContext } from "../../config/DiaryContext";
import { ScrollView } from "react-native-gesture-handler";

function makeSentimentString(score, magnitude) {
  if (score > -0.25 && score < 0.25) {
    if (magnitude < 1) {
      return "neutral";
    } else {
      return "mixed";
    }
  } else if (score >= 0.25) {
    if (score < 0.7) {
      return "positive";
    } else {
      return "very positive";
    }
  } else {
    if (score > -0.7) {
      return "negative";
    } else {
      return "very negative";
    }
  }
}

const DiaryEntryScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const { state, deleteDiaryEntry, getDiaryEntries } = useContext(DiaryContext);
  const entry = state.find((entry) => entry.id === id);
  const [loading, setLoading] = useState(false);
  const [sentimentString, setSentimentString] = useState("");

  useEffect(() => {
    navigation.setParams({ title: entry.title, entry });
    if ("sentimentScore" in entry && "sentimentMagnitude" in entry) {
      setSentimentString(
        `Google's algorithms think that your feelings are ${makeSentimentString(
          entry.sentimentScore,
          entry.sentimentMagnitude
        )}.`
      );
    }
    console.log(entry);
    console.log("Sentiment string is " + sentimentString);

    const listener = navigation.addListener("didFocus", () => {
      navigation.setParams({ title: entry.title, entry });
    });

    return () => {
      listener.remove();
    };
  }, []);

  return loading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, height: Dimensions.get("window").height - 50 }}>
        <Text h3 style={{ margin: 5 }}>
          {entry.title}
        </Text>
        <ScrollView>
          <Text style={{ margin: 5, fontSize: 30 }}>{entry.content}</Text>
        </ScrollView>
        <Text>{`Google's algorithms think that your feelings are ${makeSentimentString(
          entry.sentimentScore,
          entry.sentimentMagnitude
        )}.`}</Text>
      </View>
      <View style={{ flex: 0.08 }}>
        <Button
          title="Delete"
          onPress={() => {
            setLoading(true);
            deleteDiaryEntry(id, () => {
              getDiaryEntries(() => navigation.navigate("Diary"));
            });
          }}
          style={{
            alignSelf: "center",
          }}
        />
      </View>
    </View>
  );
};

DiaryEntryScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam("title", "Loading..."),
  headerRight: (
    <TouchableOpacity
      style={{ marginRight: 13 }}
      onPress={() =>
        navigation.navigate("Edit", { entry: navigation.getParam("entry") })
      }
    >
      <Text style={{ color: "#007AFF" }}>Edit</Text>
    </TouchableOpacity>
  ),
});
const styles = StyleSheet.create({});

export default DiaryEntryScreen;
