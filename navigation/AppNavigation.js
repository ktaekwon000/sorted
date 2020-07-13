import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { hook } from 'cavy';
import DiaryScreen from '../screens/app/DiaryScreen';
import NewEntryScreen from '../screens/app/NewEntryScreen';
import DiaryEntryScreen from '../screens/app/DiaryEntryScreen';
import EditScreen from '../screens/app/EditScreen';
import EmojiScreen from '../screens/app/EmojiScreen';
import EmotionsScreen from '../screens/app/EmotionsScreen';

// TODO: Maybe change this into a functional component? Hooks behave weirdly rn
class MenuIcon extends Component {
  render() {
    const { generateTestHook, navigation } = this.props;
    return (
      <Ionicons
        name="md-menu"
        size={24}
        color="black"
        style={{ marginLeft: 16 }}
        ref={generateTestHook('DiaryScreen.MenuButton')}
        onPress={() => navigation.openDrawer()}
      />
    );
  }
}

MenuIcon.propTypes = {
  generateTestHook: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
  }).isRequired,
};

const HookedIcon = hook(MenuIcon);

const AppNavigation = createStackNavigator(
  {
    Diary: {
      screen: DiaryScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Your entries',
        headerRight: (
          <Button
            title="New Entry"
            type="clear"
            containerStyle={{ margin: 6 }}
            titleStyle={{ fontSize: 14 }}
            onPress={() => navigation.navigate('NewEntry')}
          />
        ),
        headerLeft: () => (
          <View style={{ flexDirection: 'row' }}>
            <HookedIcon navigation={navigation} />
          </View>
        ),
      }),
    },
    NewEntry: {
      screen: NewEntryScreen,
      navigationOptions: { title: 'New entry' },
    },
    DiaryEntry: {
      screen: DiaryEntryScreen,
    },
    Edit: {
      screen: EditScreen,
    },
    Emoji: {
      screen: EmojiScreen,
      navigationOptions: { title: 'Choose an emoji' },
    },
    Emotions: {
      screen: EmotionsScreen,
      navigationOptions: { title: 'Your emotion' },
    },
  },
  {
    initialRouteName: 'Diary',
    defaultNavigationOptions: {
      title: 'placeholder text',
    },
  }
);

const AppContainer = createAppContainer(AppNavigation);

export default AppContainer;
