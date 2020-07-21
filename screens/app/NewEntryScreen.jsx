import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';
import EntryComponent from '../../components/EntryComponent';
import { Context as DiaryContext } from '../../config/DiaryContext';

const propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const NewEntryScreen = ({ navigation }) => {
  const { addDiaryEntry, getDiaryEntries } = useContext(DiaryContext);
  const [loading, setLoading] = useState(false);

  return loading ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <View>
      <EntryComponent
        onSubmit={(values) => {
          setLoading(true);
          addDiaryEntry(values, () =>
            getDiaryEntries(() => {
              setLoading(false);
              navigation.navigate('Diary');
            })
          );
        }}
      />
    </View>
  );
};

NewEntryScreen.propTypes = propTypes;

export default NewEntryScreen;
