import React, { useContext, useState, useEffect } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { Badge } from "react-native-elements";
import { Context as DiaryContext } from "../../config/DiaryContext";
import { withFirebaseHOC } from "../../config/Firebase";

const makeDatefromTimestamp = (timestamp) => new Date(timestamp.seconds * 1000);

const makeDayfromInt = (num) => {
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
      console.warn("default case reached in statsscreen");
  }
};

const StatsScreen = ({ firebase }) => {
  const { state, getDiaryEntries } = useContext(DiaryContext);
  const [loading, setLoading] = useState(true);
  const [accCreatedDate, setAccCreatedDate] = useState(new Date(0));
  const [pastWeek, setPastWeek] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  // index 0 is yesterday, index 1 is the 2 days before, etc...

  async function getAccCreatedDate() {
    const user = await firebase.retrieveUser();
    setAccCreatedDate(
      new Date(
        (await firebase.retrieveUserDocument(user)).data().createdDate.seconds *
          1000
      )
    );
  }

  const getStats = () => {
    let newArr = [];
    let pivotDay = new Date();
    pivotDay.setHours(0, 0, 0, 0);
    for (let i = 0; i < 7; i++) {
      let dayBefore = new Date(pivotDay);
      dayBefore.setDate(pivotDay.getDate() - 1);
      newArr.push(
        state.some(
          (elem) =>
            makeDatefromTimestamp(elem.createdDate) >= dayBefore &&
            makeDatefromTimestamp(elem.createdDate) < pivotDay
        )
      );
      pivotDay = dayBefore;
    }
    setPastWeek(newArr);
    console.log(newArr);
  };

  useEffect(() => {
    getAccCreatedDate();
    getDiaryEntries(() => {
      getStats();
      setLoading(false);
    });
  }, []);

  return loading ? (
    <ActivityIndicator />
  ) : new Date().getTime() - accCreatedDate.getTime() <
    1000 * 60 * 60 * 24 * 7 ? (
    <View>
      <Text>Your account was created on {accCreatedDate.toLocaleString()}</Text>
      <Text>{"\n"}Sorry!</Text>
      <Text>You can only see stats if your account is older than 1 week.</Text>
    </View>
  ) : (
    <View style={{ flex: 1 }}>
      <Text>Your account was created on {accCreatedDate.toLocaleString()}</Text>
      <Text>
        You have contributed {pastWeek.filter((entry) => entry).length} time(s)
        in the past week.
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        {pastWeek.map((val, index) => {
          return (
            <View style={{ margin: 3 }}>
              <Text>{makeDayfromInt(index)}</Text>
              <Badge status={val ? "success" : "warning"} />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default withFirebaseHOC(StatsScreen);
