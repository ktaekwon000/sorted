import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { useCavy } from 'cavy';
import DiaryScreen from '../screens/app/DiaryScreen';
import NewEntryScreen from '../screens/app/NewEntryScreen';
import DiaryEntryScreen from '../screens/app/DiaryEntryScreen';
import EditScreen from '../screens/app/EditScreen';
import EmojiScreen from '../screens/app/EmojiScreen';
import EmotionsScreen from '../screens/app/EmotionsScreen';

const AppNavigation = createStackNavigator(
  {
    Diary: {
      screen: DiaryScreen,
      navigationOptions: ({ navigation }) => {
        // const generateTestHook = useCavy();

        return {
          title: 'Your entries',
          headerRight: (
            <Button
              title="New Entry"
              type="clear"
              containerStyle={{ margin: 6 }}
              titleStyle={{ fontSize: 14 }}
              onPress={() => navigation.navigate('NewEntry')}
              // ref={generateTestHook('DiaryScreen.MenuButton')}
            />
          ),
          headerLeft: () => (
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
        };
      },
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
