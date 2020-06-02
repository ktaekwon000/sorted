import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Context as BlogContext } from "../../config/BlogContext";

const BlogListScreen = ({ navigation, firebase }) => {
  const { state, getBlogPosts } = useContext(BlogContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPosts(() => setLoading(false));
  }, []);

  return loading ? (
    <ActivityIndicator />
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
            <Text></Text>
          </View>
        )}
        refreshing={loading}
        onRefresh={() => {
          setLoading(true);
          getBlogPosts(() => setLoading(false));
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default BlogListScreen;
