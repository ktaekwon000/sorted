import React from 'react';
import { Image } from 'react-native-elements';

const AppLogo = () => (
  <Image
    source={require('../assets/sorted_icon_black_whitebg.png')}  // eslint-disable-line
    style={{ width: 213, height: 204 }}
  />
);

export default AppLogo;
