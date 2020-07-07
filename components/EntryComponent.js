import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Formik } from 'formik';

const EntryComponent = ({ initialValues, onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleChange, handleSubmit, values }) => (
        <View>
          <Input
            placeholder="Title"
            value={values.title}
            onChangeText={handleChange('title')}
          />
          <View padding={10} />
          {/* //TODO: fix the design */}
          <View style={{ height: Dimensions.get('window').height * 0.28 }}>
            <Input
              placeholder="Content"
              multiline
              scrollEnabled
              numberOfLines={10}
              textAlignVertical="top"
              value={values.content}
              onChangeText={handleChange('content')}
            />
          </View>
          <View padding={2} />
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

EntryComponent.propTypes = {
  initialValues: PropTypes.exact({
    title: PropTypes.string,
    content: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
};

EntryComponent.defaultProps = {
  initialValues: { title: '', content: '' },
};

export default EntryComponent;
