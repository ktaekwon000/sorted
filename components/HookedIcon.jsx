import React from 'react';
import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { hook } from 'cavy';

const propTypes = {
  generateTestHook: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  testHook: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  containerStyle: ViewPropTypes.style,
};

const defaultProps = {
  size: 24,
  color: 'black',
  onPress: () => undefined,
  containerStyle: {},
};

const UnhookedIcon = ({
  generateTestHook,
  name,
  size,
  color,
  testHook,
  onPress,
  containerStyle,
}) => (
  <Ionicons
    style={containerStyle}
    name={name}
    size={size}
    color={color}
    ref={generateTestHook(testHook)}
    onPress={onPress}
  />
);

UnhookedIcon.propTypes = propTypes;
UnhookedIcon.defaultProps = defaultProps;

const HookedIcon = hook(UnhookedIcon);

export default HookedIcon;
