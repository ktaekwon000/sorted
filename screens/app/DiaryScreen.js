import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableNativeFeedback,
  Text,
  Dimensions,
} from "react-native";
import { Card, Button } from "react-native-elements";
import { Context as DiaryContext } from "../../config/DiaryContext";

const DiaryScreen = ({ navigation }) => {
  const { state, getDiaryEntries } = useContext(DiaryContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDiaryEntries(() => setLoading(false));
  }, []);

  return loading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Button
        title="View stats"
        type="clear"
        onPress={() => navigation.navigate("Stats")}
      />
      <FlatList
        numColumns={2}
        data={state}
        keyExtractor={(entry) => entry.id}
        renderItem={({ item }) => (
          <TouchableNativeFeedback
            onPress={() => navigation.navigate("DiaryEntry", { id: item.id })}
          >
            <Card
              title={item.title}
              titleNumberOfLines={1}
              dividerStyle={{ marginBottom: 3 }}
              titleStyle={{ marginBottom: 3 }}
              containerStyle={{
                paddingTop: 3,
                width: Dimensions.get("window").width * 0.42,
                height: Dimensions.get("window").height * 0.25,
              }}
            >
              <Text numberOfLines={9}>{item.content}</Text>
            </Card>
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
