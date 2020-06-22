import React, { useState, useContext } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Notifications } from "expo";
import EntryComponent from "../../components/EntryComponent";
import { Context as DiaryContext } from "../../config/DiaryContext";

//notification handling
const localNotification = {
  title: "You have not entered an entry into Sorted today!",
  content: "Open Sorted to input your entry for today.",
};
const scheduleNotifications = () => {
  Notifications.cancelAllScheduledNotificationsAsync();
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(21, 0, 0, 0);
  return Notifications.scheduleLocalNotificationAsync(localNotification, {
    time: date,
    repeat: "day",
  })
    .then((id) => console.log(`Notification with ${id} schedules`))
    .catch((err) => console.log(err));
};

const NewEntryScreen = ({ navigation }) => {
  const { addDiaryEntry, getDiaryEntries } = useContext(DiaryContext);
  const [loading, setLoading] = useState(false);
  return loading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <View>
      <EntryComponent
        onSubmit={(values) => {
          {
            setLoading(true);
            scheduleNotifications();
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
