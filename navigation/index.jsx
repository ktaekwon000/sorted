import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Initial from '../screens/Initial';
import AuthNavigation from './AuthNavigation';
import DrawerNavigation from './DrawerNavigation';

const SwitchNavigator = createSwitchNavigator(
  {
    Initial,
    Auth: AuthNavigation,
    App: DrawerNavigation,
  },
  {
    initialRouteName: 'Initial',
  }
);

const AppContainer = createAppContainer(SwitchNavigator);

export default AppContainer;
