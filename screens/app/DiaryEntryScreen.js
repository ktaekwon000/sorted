import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import { Context as DiaryContext } from "../../config/DiaryContext";

const DiaryEntryScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const { state, deleteDiaryEntry, getDiaryEntries } = useContext(DiaryContext);
  const entry = state.find((entry) => entry.id === id);
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
    <ActivityIndicator />
  ) : (
    <View>
      <Text>{entry.title}</Text>
      <Text>{entry.content}</Text>
      <Button
        title="Delete"
        onPress={() => {
          setLoading(true);
          deleteDiaryEntry(id, () => {
            getDiaryEntries(() => navigation.navigate("Diary"));
          });
        }}
      />
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
