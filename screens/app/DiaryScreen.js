import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Context as DiaryContext } from "../../config/DiaryContext";

const DiaryScreen = ({ navigation, firebase }) => {
  const { state, getDiaryEntries } = useContext(DiaryContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDiaryEntries(() => setLoading(false));
  }, []);

  return loading ? (
    <ActivityIndicator />
  ) : (
    <View>
      <FlatList
        data={state}
        keyExtractor={(entry) => entry.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text>{item.title}</Text>
            <Text>{item.content}</Text>
            <Text>{new Date(item.createdDate).toString()}</Text>
            <Text>ID (for debugging): {item.id}</Text>
            <Text></Text>
          </View>
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
