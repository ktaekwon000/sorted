import React, { useContext, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Context as DiaryContext } from "../../config/DiaryContext";

const DiaryEntryScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const { state } = useContext(DiaryContext);
  const entry = state.find((entry) => entry.id === navigation.getParam("id"));

  useEffect(() => {
    navigation.setParams({ title: entry.title });

    const listener = navigation.addListener("didFocus", () => {
      navigation.setParams({ title: entry.title });
    });

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <View>
      <Text>{entry.title}</Text>
      <Text>{entry.content}</Text>
    </View>
  );
};

DiaryEntryScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam("title", "Loading..."),
});
const styles = StyleSheet.create({});

export default DiaryEntryScreen;
