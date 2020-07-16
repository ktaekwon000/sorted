import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  inputContainer: {
    margin: 15,
  },
  iconStyle: {
    marginRight: 10,
  },
});

const FormInput = forwardRef(
  (
    {
      iconName,
      iconColor,
      returnKeyType,
      keyboardType,
      name,
      placeholder,
      ...rest
    },
    ref
  ) => (
    <View style={styles.inputContainer}>
      <Input
        {...rest}
        leftIcon={<Ionicons name={iconName} size={28} color={iconColor} />}
        leftIconContainerStyle={styles.iconStyle}
        placeholderTextColor="grey"
        name={name}
        placeholder={placeholder}
        style={styles.input}
        ref={ref}
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
      />
    </View>
  )
);

FormInput.propTypes = {
  iconName: PropTypes.string,
  iconColor: PropTypes.string,
  returnKeyType: PropTypes.oneOf([
    'done',
    'go',
    'next',
    'search',
    'send',
    'none',
    'previous',
  ]),
  keyboardType: PropTypes.oneOf([
    'default',
    'email-address',
    'numeric',
    'phone-pad',
    'visible-password',
  ]),
  name: PropTypes.string,
  placeholder: PropTypes.string,
};

FormInput.defaultProps = {
  iconName: undefined,
  iconColor: undefined,
  returnKeyType: 'done',
  keyboardType: 'default',
  name: undefined,
  placeholder: undefined,
};

export default FormInput;
