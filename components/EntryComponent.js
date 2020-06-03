import React from "react";
import { View, Dimensions } from "react-native";
import { Button, Input } from "react-native-elements";
import { Formik, Form, Field } from "formik";

const EntryComponent = ({
  initialValues = { title: "", content: "" },
  onSubmit,
}) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleChange, handleSubmit, values }) => (
        <View>
          <Input
            placeholder="Title"
            value={values.title}
            onChangeText={handleChange("title")}
          />
          <View padding={10} />
          //TODO: fix the design
          <View style={{ height: Dimensions.get("window").height * 0.28 }}>
            <Input
              placeholder="Content"
              multiline
              scrollEnabled
              numberOfLines={10}
              textAlignVertical="top"
              value={values.content}
              onChangeText={handleChange("content")}
            />
          </View>
          <View padding={20} />
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default EntryComponent;
