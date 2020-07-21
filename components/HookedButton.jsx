import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { hook } from 'cavy';

const propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  generateTestHook: PropTypes.func.isRequired,
  testHook: PropTypes.string.isRequired,
};

const UnhookedButton = ({ title, onPress, generateTestHook, testHook }) => (
  <TouchableOpacity
    style={{ marginHorizontal: 13 }}
    onPress={onPress}
    ref={generateTestHook(testHook)}
  >
    <Text style={{ color: '#007AFF' }}>{title}</Text>
  </TouchableOpacity>
);

UnhookedButton.propTypes = propTypes;

const HookedButton = hook(UnhookedButton);

export default HookedButton;
