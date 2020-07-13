import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import DiaryScreen from '../screens/app/DiaryScreen';
import NewEntryScreen from '../screens/app/NewEntryScreen';
import DiaryEntryScreen from '../screens/app/DiaryEntryScreen';
import EditScreen from '../screens/app/EditScreen';
import EmojiScreen from '../screens/app/EmojiScreen';
import EmotionsScreen from '../screens/app/EmotionsScreen';
import HookedButton from '../components/HookedButton';
import HookedIcon from '../components/HookedIcon';
import HookedBackButton from '../components/HookedBackButton';

const AppNavigation = createStackNavigator(
  {
    Diary: {
      screen: DiaryScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Your entries',
        headerRight: (
          <HookedButton
            title="New Entry"
            onPress={() => navigation.navigate('NewEntry')}
            testHook="DiaryScreen.NewEntryButton"
          />
        ),
        headerLeft: (
          <HookedIcon
            name="md-menu"
            size={24}
            containerStyle={{ marginHorizontal: 16 }}
            color="black"
            testHook="DiaryScreen.MenuButton"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }),
    },
    NewEntry: {
      screen: NewEntryScreen,
      navigationOptions: {
        title: 'New entry',
      },
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
      headerLeft: <HookedBackButton testHook="AppNavigation.BackButton" />,
    },
  }
);

const AppContainer = createAppContainer(AppNavigation);

export default AppContainer;
