import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Button, Text } from "react-native-elements";
import { format } from "date-fns";
import { Context as DiaryContext } from "../../config/DiaryContext";
import { ScrollView } from "react-native-gesture-handler";

function makeSentimentString(score, magnitude) {
  let str = "Google's algorithms think that your feelings are ";
  if (score > -0.25 && score < 0.25) {
    if (magnitude < 1) {
      str += "neutral";
    } else {
      str += "mixed";
    }
  } else if (score >= 0.25) {
    if (magnitude < 0.7) {
      str += "positive";
    } else {
      str += "very positive";
    }
  } else {
    if (magnitude > -0.7) {
      str += "negative";
    } else {
      str += "very negative";
    }
  }
  return str + ".";
}

function makeStringFromTimestamp(timestamp) {
  const date = new Date(timestamp.seconds * 1000);
  return format(date, "wo 'of' MMMM, R");
}

const DiaryEntryScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const { state, deleteDiaryEntry, getDiaryEntries } = useContext(DiaryContext);
  const entry = state.find((entry) => entry.id === id);
  const [createdDateStr] = useState(
    entry ? makeStringFromTimestamp(entry.createdDate) : ""
  );
  const [updatedDateStr] = useState(
    entry
      ? "updatedDate" in entry
        ? makeStringFromTimestamp(entry.updatedDate)
        : ""
      : ""
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setParams({ title: entry.title, entry });

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
        <Text style={{ marginLeft: 5 }}>Created on {createdDateStr}</Text>
        {updatedDateStr ? (
          <Text style={{ marginLeft: 5 }}>Edited on {updatedDateStr}</Text>
        ) : null}
        <ScrollView>
          <Text style={{ margin: 5, fontSize: 24 }}>{entry.content}</Text>
        </ScrollView>
        {"sentimentScore" in entry && "sentimentMagnitude" in entry ? (
          <Text>
            {makeSentimentString(
              entry.sentimentScore,
              entry.sentimentMagnitude
            )}
          </Text>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setLoading(true);
              getDiaryEntries(() => setLoading(false));
            }}
          >
            <Text>
              We are analyzing your text. Tap this text to check for updates.
            </Text>
          </TouchableOpacity>
        )}
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
