import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { useCavy } from 'cavy';

const EmojiComponent = ({ emoji, emotion, navigation, testHook }) => {
  const generateTestHook = useCavy();

  return (
    <Button
      containerStyle={{ flex: 1, margin: 10, marginHorizontal: 30 }}
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

EmojiComponent.propTypes = {
  emoji: PropTypes.string.isRequired,
  emotion: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  testHook: PropTypes.string,
};

EmojiComponent.defaultProps = {
  testHook: undefined,
};

export default withNavigation(EmojiComponent);
