import React from 'react';
import PropTypes from 'prop-types';
import { View, Share, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-elements';
import * as Linking from 'expo-linking';
import sample from 'lodash.sample';
import { useCavy } from 'cavy';
import EMOTIONS_TO_DATA from '../../assets/EmotionsToData';

const propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const EmotionsScreen = ({ navigation }) => {
  const generateTestHook = useCavy();

  const emotion = navigation.getParam('emotion');

  return (
    <View style={{ flex: 1, backgroundColor: '#FF9933' }}>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 20,
          borderWidth: 2,
          margin: 25,
        }}
      >
        <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 20 }}>
          We think that you&apos;re feeling...
        </Text>
        <Text
          h3
          style={{ textAlign: 'center', margin: 50 }}
          ref={generateTestHook('EmotionsScreen.EmotionText')}
        >
          {emotion.emoji} {emotion.emotion}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          borderWidth: 2,
          margin: 15,
          padding: 10,
        }}
      >
        {emotion.emotion in EMOTIONS_TO_DATA ? (
          <View>
            <Text
              style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}
            >
              Our recommendation to you is...
            </Text>
            <Text
              style={{ margin: 5, fontSize: 20 }}
              ref={generateTestHook('EmotionsScreen.RecommendationText')}
            >
              {sample(EMOTIONS_TO_DATA[emotion.emotion].activities)}
            </Text>
            {'link' in EMOTIONS_TO_DATA[emotion.emotion] ? (
              <Button
                title="Tap here to learn more"
                type="outline"
                onPress={() =>
                  Linking.openURL(EMOTIONS_TO_DATA[emotion.emotion].link)
                }
                ref={generateTestHook('EmotionsScreen.LearnMoreButton')}
              />
            ) : (
              <Button
                title="Share this with your friends!"
                type="outline"
                onPress={() =>
                  Share.share({
                    message: `My diary told me that I was feeling "${emotion.emotion}"... Find out more about yourself and your feelings with Sorted! https://play.google.com/`,
                  })
                }
                ref={generateTestHook('EmotionsScreen.ShareButton')}
              />
            )}
          </View>
        ) : (
          <Text style={{ textAlign: 'center', fontSize: 16 }}>
            The emotion specified was not found in the database. Please contact
            the developers with a screenshot of this screen.
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={{ alignSelf: 'flex-end', position: 'absolute', bottom: 0 }}
        onPress={() => navigation.navigate('Helplines')}
        ref={generateTestHook('EmotionsScreen.HelplinesButton')}
      >
        <Text style={{ textAlign: 'center', margin: 15, fontSize: 10 }}>
          Please note that these are recommendations written by developers of
          the app, not mental health professionals. If you need a professional
          to talk to, check out some of helplines available by tapping these
          lines of text.
        </Text>
      </TouchableOpacity>
    </View>
  );
};

EmotionsScreen.propTypes = propTypes;

export default EmotionsScreen;
