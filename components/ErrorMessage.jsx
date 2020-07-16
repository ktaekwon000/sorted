import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginLeft: 25,
  },
  errorText: {
    color: 'red',
  },
});

const ErrorMessage = ({ errorValue }) => (
  <View style={styles.container}>
    <Text style={styles.errorText}>{errorValue}</Text>
  </View>
);

ErrorMessage.propTypes = {
  errorValue: PropTypes.string,
};

ErrorMessage.defaultProps = {
  errorValue: '',
};

export default ErrorMessage;
