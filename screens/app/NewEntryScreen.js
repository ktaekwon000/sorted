import React from "react";
import { Text, View, StyleSheet } from "react-native";
import EntryComponent from "../../components/EntryComponent";

const NewEntryScreen = () => {
  return (
    <View>
      <EntryComponent onSubmit={(values) => console.log(values)} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default NewEntryScreen;
