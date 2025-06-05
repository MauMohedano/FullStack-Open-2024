import React from 'react';
import { View, StyleSheet, ScrollView, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';
import { useHistory } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 10,
    paddingBottom: 10,
    backgroundColor: '#24292e', // color de fondo oscuro
    flexDirection: 'row',
  },
  tab: {
    marginRight: 20,
  },
  tabText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const AppBarTab = ({ to, children, style }) => {
  const history = useHistory();

  return (
    <Pressable onPress={() => history.push(to)} style={styles.tab}>
      <Text style={[styles.tabText, style]}>{children}</Text>
    </Pressable>
  );
};

export const Appbar = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        <AppBarTab to="/">Repositories</AppBarTab>
        <AppBarTab to="/signin">Sign In</AppBarTab>
      </ScrollView>
    </View>
  );
};
