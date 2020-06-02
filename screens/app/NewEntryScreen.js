import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import EntryComponent from "../../components/EntryComponent";
import { Context as DiaryContext } from "../../config/DiaryContext";

const NewEntryScreen = ({ navigation }) => {
  const { addDiaryEntry } = useContext(DiaryContext);
  return (
    <View>
      <EntryComponent
        onSubmit={(values) =>
          addDiaryEntry(values, () => navigation.navigate("Diary"))
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default NewEntryScreen;
