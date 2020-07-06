import React, { forwardRef } from 'react';
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

const FormInput = (
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
    />
  </View>
);

export default forwardRef(FormInput);
