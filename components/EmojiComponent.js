import React from 'react';
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

export default withNavigation(EmojiComponent);
