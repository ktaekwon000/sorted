import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import EMOJIS from '../../assets/Emojis';
import { withFirebaseHOC } from '../../config/Firebase';

const propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
  firebase: PropTypes.shape({
    retrieveUser: PropTypes.func.isRequired,
    retrieveUserDocument: PropTypes.func.isRequired,
    updateUserEmoji: PropTypes.func.isRequired,
  }).isRequired,
};

const SelectUserEmojiScreen = ({ navigation, firebase }) => {
  async function updateUserEmoji(emoji, callback) {
    const user = await firebase.retrieveUser();
    firebase.updateUserEmoji(user)(emoji);

    if (callback) {
      callback();
    }
  }

  return (
    <View style={{ alignContent: 'center', justifyContent: 'center' }}>
      <Text h4 style={{ textAlign: 'center', margin: 50 }}>
        Select an emoji!
      </Text>
      <FlatList
        numColumns={8}
        data={EMOJIS}
        keyExtractor={(str) => str}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              updateUserEmoji(item, () => {
                navigation.getParam('setUserEmoji')(item);
                navigation.navigate('Diary');
              })
            }
          >
            <Text style={{ fontSize: 30, margin: 8 }}>{item}</Text>
          </TouchableOpacity>
        )}
        style={{ alignSelf: 'center' }}
      />
    </View>
  );
};

SelectUserEmojiScreen.propTypes = propTypes;

export default withFirebaseHOC(SelectUserEmojiScreen);
