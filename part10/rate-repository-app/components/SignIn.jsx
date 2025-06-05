import React from 'react';
import { View, Text, StyleSheet, Platform, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput  from './FormikTextInput';

const fontFamily = Platform.select({
  android: "Roboto",
  ios: "Arial"
})
const styles = StyleSheet.create({
  container: {
    padding: 20,
     backgroundColor: 'white'
  },
  button: {
    backgroundColor: '#0366d6',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  input:{
    fontFamily,
  
  }
});4

const validationSchema = yup.object().shape({
  username: yup.string().required('El nombre de usuario es obligatorio'),
  password: yup.string().required('La contraseña es obligatoria'),
});

export const SignIn = () => {
 const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <>
            <FormikTextInput
              name="username"
              placeholder="Nombre de usuario"
            />
            <FormikTextInput
              name="password"
              placeholder="Contraseña"
              secureTextEntry={true}
            />
            <Pressable onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            </Pressable>
          </>
        )}
      </Formik>
    </View>
  );
};