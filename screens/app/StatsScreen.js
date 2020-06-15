import React, { useContext, useState, useEffect } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { Badge } from "react-native-elements";
import { format, formatDistance } from "date-fns";
import { Context as DiaryContext } from "../../config/DiaryContext";
import { withFirebaseHOC } from "../../config/Firebase";

const makeDatefromTimestamp = (timestamp) => new Date(timestamp.seconds * 1000);

const makeDayfromInt = (num) => {
  const currDay = new Date().getDay();
  num = currDay - num - 2;
  while (num < 0) {
    num += 7;
  }
  switch (num) {
    case 0:
      return "Monday";
    case 1:
      return "Tuesday";
    case 2:
      return "Wednesday";
    case 3:
      return "Thursday";
    case 4:
      return "Friday";
    case 5:
      return "Saturday";
    case 6:
      return "Sunday";
    default:
      console.warn("default case reached in statsscreen, makeDayfromInt");
  }
};

const makeColorFromString = (str) => {
  switch (str) {
    case "None":
      return "#848484";
    case "Mixed/Neutral":
      return "#FFBE46";
    case "Bad":
      return "#E67C73";
    case "Good":
      return "#57BB8A";
    default:
      console.warn("default case reached in statsscreen, makeColorFromString");
      return "";
  }
};

const StatsScreen = ({ firebase }) => {
  const { state, getDiaryEntries } = useContext(DiaryContext);
  const [loading, setLoading] = useState(true);
  const [accCreatedDate, setAccCreatedDate] = useState(new Date(0));
  const [pastWeek, setPastWeek] = useState([]);
  const [emotions, setEmotions] = useState([]);
  const [dailyNumbers, setDailyNumbers] = useState(-1);
  // index 0 is yesterday, index 1 is the 2 days before, etc...

  async function getAccCreatedDate(callback) {
    const user = await firebase.retrieveUser();
    setAccCreatedDate(
      new Date(
        (await firebase.retrieveUserDocument(user)).data().createdDate.seconds *
          1000
      )
    );
    if (callback) {
      callback();
    }
  }

  const getStats = (callback) => {
    let newArr = [];

    let pivotDay = new Date();
    pivotDay.setHours(0, 0, 0, 0);
    for (let i = 0; i < 7; i++) {
      let dayBefore = new Date(pivotDay);
      dayBefore.setDate(pivotDay.getDate() - 1);
      newArr.push(
        state.filter(
          (elem) =>
            makeDatefromTimestamp(elem.createdDate) >= dayBefore &&
            makeDatefromTimestamp(elem.createdDate) < pivotDay
        )
      );
      pivotDay = dayBefore;
    }
    setPastWeek(newArr.reverse());

    let dailyNumbers = [];
    newArr.forEach((arr) => dailyNumbers.push(arr.length));
    setDailyNumbers(dailyNumbers.filter((num) => num != 0).length);

    let emotions = [];
    newArr.forEach((arr) => {
      let total = 0;
      arr.forEach((entry) => {
        if (entry.sentimentScore >= 0.25) {
          total += 1;
        } else if (entry.sentimentScore <= -0.25) {
          total -= 1;
        }
      });
      if (arr.length == 0) {
        emotions.push("None");
      } else {
        if (total == 0) {
          emotions.push("Mixed/Neutral");
        } else if (total > 0) {
          emotions.push("Good");
        } else {
          emotions.push("Bad");
        }
      }
    });
    setEmotions(emotions.reverse());

    if (callback) {
      callback();
    }
  };

  useEffect(() => {
    getAccCreatedDate();
    getDiaryEntries(() => {
      getStats(() => setLoading(false));
    });
  }, []);

  return loading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  ) : new Date().getTime() - accCreatedDate.getTime() <
    1000 * 60 * 60 * 24 * 7 ? (
    <View>
      <Text>
        Your account was created on {format(accCreatedDate, "do 'of' MMMM, R")}
      </Text>
      <Text>{"\n"}Sorry!</Text>
      <Text>You can only see stats if your account is older than 1 week.</Text>
      <Text>
        Your account was created {formatDistance(accCreatedDate, new Date())}{" "}
        ago.
      </Text>
    </View>
  ) : (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={{ margin: 5 }}>
        Your account was created on {format(accCreatedDate, "do 'of' MMMM, R")}.
      </Text>
      <Text style={{ margin: 5, textAlign: "center" }}>
        In the last week, you wrote diary entries on {dailyNumbers} out of the 7
        days. {"\n"}
        {dailyNumbers >= 4 ? "Keep it up!" : "Try writing more!"}
        {"\n"}
      </Text>
      <Text style={{ textAlign: "center" }}>Stats for the last 7 days:</Text>
      <View style={{ flexDirection: "column", justifyContent: "space-evenly" }}>
        {emotions.map((val, index) => {
          return (
            <View style={{ margin: 8, alignItems: "center" }}>
              <Text>{makeDayfromInt(index)}</Text>
              <Badge
                badgeStyle={{
                  backgroundColor: makeColorFromString(val),
                }}
                value={val}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default withFirebaseHOC(StatsScreen);
