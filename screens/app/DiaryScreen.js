import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableNativeFeedback,
} from "react-native";
import { ListItem } from "react-native-elements";
import { Context as DiaryContext } from "../../config/DiaryContext";

const DiaryScreen = ({ navigation }) => {
  const { state, getDiaryEntries } = useContext(DiaryContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDiaryEntries(() => setLoading(false));
  }, []);

  return loading ? (
    <ActivityIndicator />
  ) : (
    <View style={{ flex: 1 }}>
      <FlatList
        data={state}
        keyExtractor={(entry) => entry.id}
        renderItem={({ item }) => (
          <TouchableNativeFeedback
            onPress={() => navigation.navigate("DiaryEntry", { id: item.id })}
          >
            <ListItem
              title={item.title}
              subtitle={new Date(item.createdDate.seconds * 1000).toString()}
              topDivider
            />
          </TouchableNativeFeedback>
        )}
        refreshing={loading}
        onRefresh={() => {
          setLoading(true);
          getDiaryEntries(() => setLoading(false));
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default DiaryScreen;
