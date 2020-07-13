import React, { Component, useState, useEffect } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import { useCavy, wrap, hook } from 'cavy';
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

// dirty hack. https://github.com/pixielabs/cavy/issues/75
class Icon extends Component {
  render() {
    const { generateTestHook, navigation, name, routeName, size } = this.props;
    return (
      <Ionicons
        name={name}
        size={size}
        onPress={() => navigation.navigate(routeName)}
        ref={generateTestHook(`DrawerNavigation.${routeName}`)}
      />
    );
  }
}

Icon.propTypes = {
  generateTestHook: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

const WrappedIcon = hook(Icon);

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
      navigationOptions: ({ navigation }) => ({
        title: 'Account Settings',
        drawerIcon: (
          <WrappedIcon
            name="md-person"
            size={24}
            navigation={navigation}
            routeName={navigation.state.routeName}
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
