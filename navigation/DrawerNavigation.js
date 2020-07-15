import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  ScrollView,
  Text as UnwrappedText,
  View,
  SafeAreaView,
} from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { useCavy, wrap } from 'cavy';
import { withFirebaseHOC } from '../config/Firebase';
import { Provider as DiaryProvider } from '../config/DiaryContext';
import DiaryScreens from './AppNavigation';
import ContactsScreen from '../screens/app/ContactsScreen';
import StatsScreen from '../screens/app/StatsScreen';
import SettingsScreen from '../screens/app/SettingsScreen';
import HookedIcon from '../components/HookedIcon';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const CustomDrawerContentComponent = ({ firebase, ...props }) => {
  const generateTestHook = useCavy();
  const Text = wrap(UnwrappedText);

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
          <Text ref={generateTestHook('DrawerNavigation.NameField')}>
            {name
              ? `Welcome ${name}.`
              : `Your account is in the process of being set up.
You may have to restart the app for your name to show here.`}
          </Text>
          <Text>Have a nice day today 😊</Text>
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
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <HookedIcon
            name="md-bookmarks"
            size={24}
            color="black"
            testHook="DrawerNavigation.Diary"
            onPress={() => navigation.navigate('Diary')}
          />
        ),
      }),
    },
    Helplines: {
      screen: ContactsScreen,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <HookedIcon
            name="md-call"
            size={24}
            color="black"
            testHook="DrawerNavigation.Helplines"
            onPress={() => navigation.navigate('Helplines')}
          />
        ),
      }),
    },
    Stats: {
      screen: StatsScreen,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <HookedIcon
            name="md-stats"
            size={24}
            color="black"
            testHook="DrawerNavigation.Stats"
            onPress={() => navigation.navigate('Stats')}
          />
        ),
      }),
    },
    Account: {
      screen: SettingsScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Account Settings',
        drawerIcon: (
          <HookedIcon
            name="md-person"
            size={24}
            color="black"
            testHook="DrawerNavigation.Account"
            onPress={() => navigation.navigate('Account')}
          />
        ),
      }),
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
