import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useCavy } from 'cavy';
import ErrorMessage from './ErrorMessage';

const entrySchema = Yup.object().shape({
  title: Yup.string().required('A title is required.'),
  content: Yup.string().required('Content is required.'),
});

const EntryComponent = ({ initialValues, onSubmit }) => {
  const generateTestHook = useCavy();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={entrySchema}
    >
      {({ handleChange, handleSubmit, values, touched, errors }) => (
        <View>
          <Input
            name="title"
            placeholder="Title"
            value={values.title}
            onChangeText={handleChange('title')}
            ref={generateTestHook('EntryComponent.Title')}
          />
          <ErrorMessage errorValue={touched.title && errors.title} />
          {/* //TODO: fix the design */}
          <View style={{ height: Dimensions.get('window').height * 0.28 }}>
            <Input
              name="content"
              placeholder="Content"
              multiline
              scrollEnabled
              numberOfLines={10}
              textAlignVertical="top"
              value={values.content}
              onChangeText={handleChange('content')}
              ref={generateTestHook('EntryComponent.Content')}
            />
          </View>
          <ErrorMessage errorValue={touched.content && errors.content} />
          <View padding={2} />
          <Button
            title="Submit"
            onPress={handleSubmit}
            ref={generateTestHook('EntryComponent.SubmitButton')}
          />
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
