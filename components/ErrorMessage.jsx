import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 25,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

const propTypes = {
  errorValue: PropTypes.string,
};

const defaultProps = {
  errorValue: '',
};

const ErrorMessage = ({ errorValue }) => (
  <View style={styles.container}>
    <Text style={styles.errorText}>{errorValue}</Text>
  </View>
);

ErrorMessage.propTypes = propTypes;
ErrorMessage.defaultProps = defaultProps;

export default ErrorMessage;
