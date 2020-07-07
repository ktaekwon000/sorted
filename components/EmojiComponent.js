import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

const EmojiComponent = ({ emoji, emotion, navigation }) => (
  <Button
    containerStyle={{ flex: 1, margin: 10, marginHorizontal: 30 }}
    title={emoji}
    type="outline"
    titleStyle={{ fontSize: 36, margin: 10 }}
    onPress={() =>
      navigation.navigate('Emotions', { emotion: { emoji, emotion } })
    }
  />
);

EmojiComponent.propTypes = {
  emoji: PropTypes.string.isRequired,
  emotion: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(EmojiComponent);
