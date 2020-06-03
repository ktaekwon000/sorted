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
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, height: Dimensions.get("window").height - 50 }}>
        <Text h3 style={{ margin: 5 }}>
          {entry.title}
        </Text>
        <ScrollView>
          <Text style={{ margin: 5, fontSize: 30 }}>{entry.content}</Text>
        </ScrollView>
      </View>
      <View style={{ flex: 0.08 }}>
        <Button
          title=" Delete "
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
