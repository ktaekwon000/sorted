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
import { Card } from "react-native-elements";
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
    <View style={{ flex: 1, alignItems: "center" }}>
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
            {/* <ListItem
              title={item.title}
              subtitle={new Date(item.createdDate.seconds * 1000).toString()}
              topDivider
            /> */}
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
