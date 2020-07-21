import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { useCavy } from 'cavy';

const propTypes = {
  emoji: PropTypes.string.isRequired,
  emotion: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  testHook: PropTypes.string,
};

const defaultProps = {
  testHook: undefined,
};

const EmojiComponent = ({ emoji, emotion, navigation, testHook }) => {
  const generateTestHook = useCavy();

  return (
    <Button
      containerStyle={{
        flex: 1,
        margin: 5,
        marginHorizontal: 30,
      }}
      buttonStyle={{
        borderWidth: 3,
        borderColor: 'black',
        backgroundColor: 'white',
      }}
      title={emoji}
      type="outline"
      titleStyle={{ fontSize: 36, margin: 10 }}
      onPress={() =>
        navigation.navigate('Emotions', { emotion: { emoji, emotion } })
      }
      ref={generateTestHook(testHook)}
    />
  );
};

EmojiComponent.propTypes = propTypes;
EmojiComponent.defaultProps = defaultProps;

export default withNavigation(EmojiComponent);
