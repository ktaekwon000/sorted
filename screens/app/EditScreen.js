import React, { useState, useContext, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import EntryComponent from '../../components/EntryComponent';
import { Context as DiaryContext } from '../../config/DiaryContext';

const EditScreen = ({ navigation }) => {
  const { editDiaryEntry, getDiaryEntries } = useContext(DiaryContext);
  const [loading, setLoading] = useState(false);
  const { id, title, content } = navigation.getParam('entry');

  useEffect(() => {
    navigation.setParams({ origTitle: navigation.getParam('entry').title });
  }, []);

  return loading ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <View>
      <EntryComponent
        initialValues={{ title, content }}
        onSubmit={(values) => {
          setLoading(true);
          editDiaryEntry(id, values, () =>
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

EditScreen.navigationOptions = ({ navigation }) => ({
  title: `Editing ${navigation.getParam('origTitle', 'loading...')}`,
});

export default EditScreen;
