import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RepositoryList } from './components/RepositoryList';
import { Appbar } from './components/Appbar';

import { Switch, Route, NativeRouter } from 'react-router-native';
import { SignIn } from './components/SignIn';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
    paddingTop: 20, // Ajustar para la altura de la barra de estado si es necesario
  },
});

const Main = () => {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <Appbar />
        <Switch>
          <Route exact path="/" component={RepositoryList} />
          <Route path="/signin" component={SignIn} />
        </Switch>
      </View>
    </NativeRouter>
  );
};

export default Main;