// components/FormikTextInput.jsx
import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { useField } from 'formik';

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 5,
    borderRadius: 4,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        {...props}
      />
      {meta.touched && meta.error ? (
        <Text style={styles.errorText}>{meta.error}</Text>
      ) : null}
    </View>
  );
};

export default FormikTextInput;
