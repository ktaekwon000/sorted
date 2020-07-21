import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text as UnwrappedText, View } from 'react-native';
import { Button } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { useCavy, wrap } from 'cavy';
import { withFirebaseHOC } from '../../config/Firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginHorizontal: 10,
  },
});

function Settings({ navigation, firebase }) {
  const generateTestHook = useCavy();
  const Text = wrap(UnwrappedText);

  const [ready, setReady] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [uid, setUid] = useState('');

  async function handleSignout() {
    await firebase.signOut();
    navigation.navigate('Auth');
  }

  async function retrieveUser() {
    const user = await firebase.retrieveUser();
    setName(user.displayName);
    setEmail(user.email);
    setUid(user.uid);
  }

  useEffect(() => {
    retrieveUser();
    setReady(true);
  }, []);

  return !ready ? (
    <View style={styles.container}>
      <Text>loading...</Text>
      <Text>
        Please check your internet connection if this is taking too long
      </Text>
    </View>
  ) : (
    <View style={styles.container}>
      <Text
        style={styles.text}
        ref={generateTestHook('SettingsScreen.NameField')}
      >
        Welcome! You are {name}
      </Text>
      <Text
        style={styles.text}
        ref={generateTestHook('SettingsScreen.EmailField')}
      >
        Your email is {email}
      </Text>
      <Text style={styles.text}>
        {'\n'}The following information is only for debugging purposes:
      </Text>
      <Text
        style={styles.text}
        ref={generateTestHook('SettingsScreen.UidField')}
      >
        uid: {uid}
      </Text>
      <Button
        title="Signout"
        onPress={handleSignout}
        titleStyle={{
          color: '#F57C00',
        }}
        type="clear"
        ref={generateTestHook('SettingsScreen.SignoutButton')}
      />
    </View>
  );
}

Settings.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  firebase: PropTypes.shape({
    retrieveUser: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }).isRequired,
};

const SettingsWithFirebase = withFirebaseHOC(Settings);

const SettingsNavigation = createStackNavigator(
  {
    Settings: {
      screen: SettingsWithFirebase,
      navigationOptions: ({ navigation }) => ({
        title: 'Account Settings',
        headerLeft: (
          <View style={{ flexDirection: 'row' }}>
            <Button
              icon={<Ionicons name="md-menu" size={24} color="black" />}
              type="clear"
              containerStyle={{ marginLeft: 6 }}
              titleStyle={{ fontSize: 14 }}
              onPress={() => navigation.openDrawer()}
            />
          </View>
        ),
        headerRight: (
          <Button
            title="Contact developers"
            type="clear"
            containerStyle={{ marginRight: 6 }}
            titleStyle={{ fontSize: 14 }}
            onPress={() => Linking.openURL('mailto: ktaekwon000@gmail.com')}
          />
        ),
      }),
    },
  },
  {
    initialRouteName: 'Settings',
  }
);

export default SettingsNavigation;
