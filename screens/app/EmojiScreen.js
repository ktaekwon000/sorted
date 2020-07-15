import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { useCavy } from 'cavy';
import EmojiComponent from '../../components/EmojiComponent';

const EmojiScreen = ({ navigation }) => {
  const generateTestHook = useCavy();

  const emotions = navigation.getParam('emotions');

  return (
    <View style={{ flex: 1 }}>
      <Text
        h4
        style={{ textAlign: 'center', marginTop: 20, flex: 1 }}
        ref={generateTestHook('EmojiScreen.TitleText')}
      >
        Pick the emoji which you think is appropriate for this entry :)
      </Text>
      <EmojiComponent
        emoji={emotions.emoji0}
        emotion={emotions.emoji0_emotion}
        testHook="EmojiScreen.emoji0Button"
      />
      <EmojiComponent
        emoji={emotions.emoji1}
        emotion={emotions.emoji1_emotion}
        testHook="EmojiScreen.emoji1Button"
      />
      <EmojiComponent
        emoji={emotions.emoji2}
        emotion={emotions.emoji2_emotion}
        testHook="EmojiScreen.emoji2Button"
      />
      <EmojiComponent
        emoji={emotions.emoji3}
        emotion={emotions.emoji3_emotion}
        testHook="EmojiScreen.emoji3Button"
      />
      <EmojiComponent
        emoji={emotions.emoji4}
        emotion={emotions.emoji4_emotion}
        testHook="EmojiScreen.emoji4Button"
      />
    </View>
  );
};

EmojiScreen.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

export default EmojiScreen;
