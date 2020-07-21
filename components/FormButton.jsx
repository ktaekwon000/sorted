import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';

const propTypes = {
  title: PropTypes.string,
  buttonType: PropTypes.oneOf(['solid', 'clear', 'outline']),
  buttonColor: PropTypes.string,
};

const defaultProps = {
  title: '',
  buttonType: 'solid',
  buttonColor: '#2089dc',
};

const FormButton = forwardRef(
  ({ title, buttonType, buttonColor, ...rest }, ref) => (
    <Button
      {...rest}
      type={buttonType}
      title={title}
      buttonStyle={{ borderColor: buttonColor, borderRadius: 20 }}
      titleStyle={{ color: buttonColor }}
      ref={ref}
    />
  )
);

FormButton.propTypes = propTypes;
FormButton.defaultProps = defaultProps;

export default FormButton;
