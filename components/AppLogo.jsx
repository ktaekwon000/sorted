import React, { forwardRef } from 'react';
import { Image } from 'react-native-elements';

const AppLogo = forwardRef((props, ref) => (
  <Image
    source={require('../assets/sorted_icon_black_whitebg.png')}  // eslint-disable-line
    style={{ width: 213, height: 204 }}
    ref={ref}
  />
));

export default AppLogo;
