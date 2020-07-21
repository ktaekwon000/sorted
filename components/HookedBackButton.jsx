import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { HeaderBackButton } from 'react-navigation-stack';
import { hook } from 'cavy';

const propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  generateTestHook: PropTypes.func.isRequired,
  testHook: PropTypes.string.isRequired,
};

const UnhookedBackButton = ({ navigation, generateTestHook, testHook }) => (
  <HeaderBackButton
    ref={generateTestHook(testHook)}
    onPress={() => navigation.goBack()}
  />
);

UnhookedBackButton.propTypes = propTypes;

const HookedBackButton = withNavigation(hook(UnhookedBackButton));

export default HookedBackButton;
