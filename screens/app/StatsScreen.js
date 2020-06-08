import React, { useContext, useState, useEffect } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { Context as DiaryContext } from "../../config/DiaryContext";

const StatsScreen = () => {
  const { state, getDiaryEntries } = useContext(DiaryContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDiaryEntries(() => setLoading(false));
  }, []);

  return loading ? (
    <ActivityIndicator />
  ) : (
    <View>
      <Text>stats screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default StatsScreen;
