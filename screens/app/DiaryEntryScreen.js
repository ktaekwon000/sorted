import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { Button } from "react-native-elements";
import { Context as DiaryContext } from "../../config/DiaryContext";

const DiaryEntryScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const { state, deleteDiaryEntry, getDiaryEntries } = useContext(DiaryContext);
  const entry = state.find((entry) => entry.id === id);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setParams({ title: entry.title });

    const listener = navigation.addListener("didFocus", () => {
      navigation.setParams({ title: entry.title });
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
});
const styles = StyleSheet.create({});

export default DiaryEntryScreen;
