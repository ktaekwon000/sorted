import React, { useState, useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import EntryComponent from '../../components/EntryComponent';
import { Context as DiaryContext } from '../../config/DiaryContext';

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

export default NewEntryScreen;
