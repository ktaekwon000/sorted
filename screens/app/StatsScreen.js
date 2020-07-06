import React, { useContext, useState, useEffect } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { Text, Badge, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { createStackNavigator } from 'react-navigation-stack';
import { Context as DiaryContext } from '../../config/DiaryContext';
import { withFirebaseHOC } from '../../config/Firebase';

const makeDatefromTimestamp = (timestamp) => new Date(timestamp.seconds * 1000);

const makeDayfromInt = (num) => {
  const currDay = new Date().getDay();
  let newNum = currDay - num - 2;
  while (newNum < 0) {
    newNum += 7;
  }
  switch (newNum) {
    case 0:
      return 'Monday';
    case 1:
      return 'Tuesday';
    case 2:
      return 'Wednesday';
    case 3:
      return 'Thursday';
    case 4:
      return 'Friday';
    case 5:
      return 'Saturday';
    case 6:
      return 'Sunday';
    default:
      return '';
  }
};

const makeColorFromString = (str) => {
  switch (str) {
    case 'None':
      return '#848484';
    case 'Mixed/Neutral':
      return '#FFBE46';
    case 'Bad':
      return '#E67C73';
    case 'Good':
      return '#57BB8A';
    default:
      return '';
  }
};

const StatsScreen = ({ firebase, navigation }) => {
  // TODO: clean these up...
  const { state, getDiaryEntries } = useContext(DiaryContext);
  const [loading, setLoading] = useState(true);
  const [accCreatedDate, setAccCreatedDate] = useState(new Date(0));
  let lastNotifiedDate = 0;
  const [emotions, setEmotions] = useState([]);
  const [consecutive, setConsecutive] = useState(-1);
  // index 0 is yesterday, index 1 is the 2 days before, etc...

  async function getUserInfo(callback) {
    const user = await firebase.retrieveUser();
    const userData = (await firebase.retrieveUserDocument(user)).data();

    setAccCreatedDate(new Date(userData.createdDate.seconds * 1000));
    lastNotifiedDate =
      'notifiedDate' in userData
        ? new Date(userData.notifiedDate.seconds * 1000)
        : new Date(0);

    if (callback) {
      callback();
    }
  }

  async function setNotifiedDate(callback) {
    const user = await firebase.retrieveUser();
    await firebase.updateNotifiedDate(user);
    if (callback) {
      callback();
    }
  }

  const getStats = (callback) => {
    const newArr = [];

    const pivotDay = new Date();
    pivotDay.setHours(0, 0, 0, 0);
    while (pivotDay > new Date(2020, 0)) {
      const dayBefore = new Date(pivotDay);
      dayBefore.setDate(pivotDay.getDate() - 1);
      newArr.push(
        state.filter(
          (elem) =>
            makeDatefromTimestamp(elem.createdDate) >= dayBefore &&
            makeDatefromTimestamp(elem.createdDate) < pivotDay
        )
      );
      pivotDay.setDate(pivotDay.getDate() - 1);
    }

    let consecutiveCount = 0;
    for (let i = 0; i < newArr.length; i += 1) {
      if (newArr[i].length > 0) {
        consecutiveCount += 1;
      } else {
        break;
      }
    }
    setConsecutive(consecutiveCount);

    const emotionsArr = [];
    newArr.slice(0, 7).forEach((arr) => {
      let total = 0;
      arr.forEach((entry) => {
        if (entry.sentimentScore >= 0.2) {
          total += 1;
        } else if (entry.sentimentScore <= -0.2) {
          total -= 1;
        }
      });
      if (arr.length === 0) {
        emotionsArr.push('None');
      } else if (total === 0) {
        emotionsArr.push('Mixed/Neutral');
      } else if (total > 0) {
        emotionsArr.push('Good');
      } else {
        emotionsArr.push('Bad');
      }
    });
    setEmotions(emotionsArr);

    let badDays = 0;
    emotionsArr.forEach((txt) => {
      if (txt === 'Bad') {
        badDays += 1;
      }
    });
    if (badDays >= 4 && new Date() - lastNotifiedDate > 1000 * 60 * 60 * 24) {
      Alert.alert(
        'Alert',
        "It appears that you haven't been feeling too well recently. Keep in " +
          'mind that you always will have someone to talk to. Press Helplines' +
          ' to bring you to the list of helplines, or press Cancel to go back' +
          " to the Stats screen. If you press Cancel, you won't see this for " +
          'the nest 24 hours.',
        [
          {
            text: 'Cancel',
            onPress: () => {
              setNotifiedDate();
            },
            style: 'cancel',
          },
          {
            text: 'Helplines',
            onPress: () => {
              navigation.navigate('Helplines');
            },
          },
        ]
      );
    }

    if (callback) {
      callback();
    }
  };

  useEffect(() => {
    navigation.setParams({
      refresh: () => {
        setLoading(true);
        getDiaryEntries(() => {
          getStats(() => setLoading(false));
        });
      },
    });

    getUserInfo(() =>
      getDiaryEntries(() => {
        getStats(() => setLoading(false));
      })
    );
  }, []);

  return loading ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ margin: 5 }}>
        Your account was created on {format(accCreatedDate, "do 'of' MMMM, R")}.
      </Text>
      <Text style={{ textAlign: 'center', margin: 10, marginVertical: 20 }}>
        {consecutive <= 0
          ? "Looks like you haven't written an entry yesterday. Try restarting your streak today!"
          : `You have written for ${consecutive} consecutive days.\n${
              consecutive <= 3
                ? "You're writing entries pretty often. Keep it up!"
                : "😊 Wow, you're writing entries pretty often. Keep it up!"
            }`}
      </Text>
      <View style={{ padding: 10 }} />
      <Text style={{ textAlign: 'center', marginTop: 5 }}>
        Stats for the last 7 days:
      </Text>
      <View style={{ flexDirection: 'column', justifyContent: 'space-evenly' }}>
        {emotions.map((val, index) => {
          return (
            <View
              style={{ margin: 8, alignItems: 'center' }}
              key={makeDayfromInt(index)}
            >
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

const StatsWithFirebase = withFirebaseHOC(StatsScreen);

StatsWithFirebase.navigationOptions = ({ navigation }) => {
  return {
    title: 'Stats',
    headerLeft: () => (
      <Button
        icon={<Ionicons name="md-menu" size={24} color="black" />}
        type="clear"
        containerStyle={{ marginLeft: 6 }}
        titleStyle={{ fontSize: 14 }}
        onPress={() => navigation.openDrawer()}
      />
    ),
    headerRight: (
      <Button
        icon={<Ionicons name="md-refresh" size={24} color="black" />}
        type="clear"
        containerStyle={{ marginLeft: 6 }}
        titleStyle={{ fontSize: 14 }}
        onPress={navigation.getParam('refresh')}
      />
    ),
  };
};

const StatsNavigation = createStackNavigator(
  {
    Stats: {
      screen: StatsWithFirebase,
    },
  },
  {
    initialRouteName: 'Stats',
  }
);

export default StatsNavigation;
