import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, Text, View, SafeAreaView } from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import { withFirebaseHOC } from '../config/Firebase';
import { Provider as DiaryProvider } from '../config/DiaryContext';
import DiaryScreens from './AppNavigation';
import ContactsScreen from '../screens/app/ContactsScreen';
import StatsScreen from '../screens/app/StatsScreen';
import SettingsScreen from '../screens/app/SettingsScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const CustomDrawerContentComponent = ({ firebase, ...props }) => {
  const [name, setName] = useState('loading...');
  async function getUserInfo() {
    const user = await firebase.retrieveUser();
    setName(user.displayName);
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <ScrollView>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: 'always', horizontal: 'never' }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 30,
            marginVertical: 10,
            marginTop: 30,
          }}
        >
          <Text>
            {name
              ? `Welcome ${name}.`
              : `Your account is in the process of being set up.
You may have to restart the app for your name to show here.`}
          </Text>
          <Text>Have a nice day today 😊</Text>
          {/* <Text>{`${email}`}</Text> */}
        </View>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
  );
};

CustomDrawerContentComponent.propTypes = {
  firebase: PropTypes.shape({
    retrieveUser: PropTypes.func.isRequired,
  }).isRequired,
};

const DrawerNavigation = createDrawerNavigator(
  {
    Diary: {
      screen: DiaryScreens,
      navigationOptions: {
        drawerIcon: <Ionicons name="md-bookmarks" size={24} />,
      },
    },
    Helplines: {
      screen: ContactsScreen,
      navigationOptions: {
        drawerIcon: <Ionicons name="md-call" size={24} />,
      },
    },
    Stats: {
      screen: StatsScreen,
      navigationOptions: {
        drawerIcon: <Ionicons name="md-stats" size={24} />,
      },
    },
    Account: {
      screen: SettingsScreen,
      navigationOptions: {
        title: 'Account Settings',
        drawerIcon: <Ionicons name="md-person" size={24} />,
      },
    },
  },
  {
    initialRouteName: 'Diary',
    contentComponent: withFirebaseHOC(CustomDrawerContentComponent),
  }
);

const AppContainer = createAppContainer(DrawerNavigation);

export default () => (
  <DiaryProvider>
    <AppContainer />
  </DiaryProvider>
);
