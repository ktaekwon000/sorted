import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import EntryComponent from "../../components/EntryComponent";
import { Context as DiaryContext } from "../../config/DiaryContext";

const NewEntryScreen = ({ navigation }) => {
  const { addDiaryEntry, getDiaryEntries } = useContext(DiaryContext);
  const [loading, setLoading] = useState(false);
  return loading ? (
    <ActivityIndicator />
  ) : (
    <View>
      <EntryComponent
        onSubmit={(values) => {
          {
            setLoading(true);
            addDiaryEntry(values, () =>
              getDiaryEntries(() => {
                setLoading(false);
                navigation.navigate("Diary");
              })
            );
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default NewEntryScreen;
