import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import ForgotPassword from '../screens/auth/ForgotPassword';

const AuthNavigation = createStackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup },
    ForgotPassword: { screen: ForgotPassword },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  }
);

export default AuthNavigation;
