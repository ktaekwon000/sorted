import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { Button } from "react-native-elements";
import { Context as BlogContext } from "../../config/BlogContext";

const BlogListScreen = ({ navigation, firebase }) => {
  const { state, getBlogPosts } = useContext(BlogContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPosts(() => setLoading(false));
  }, []);

  return loading ? (
    <Text>loading...</Text>
  ) : (
    <View>
      <FlatList
        data={state}
        keyExtractor={(entry) => entry.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.content}</Text>
            <Text>{item.createdDate}</Text>
            <Text>{item.id}</Text>
          </View>
        )}
      />
      <Button
        title="Go to settings"
        type="outline"
        onPress={() => navigation.navigate("Settings")}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default BlogListScreen;
