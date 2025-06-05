// components/RepositoryItem.jsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import formatThousands from '../utils/formatThousands';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  fullName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
    color: '#555',
  },
  language: {
    alignSelf: 'flex-start',
    backgroundColor: '#0366d6',
    color: 'white',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#555',
  },
  statValue: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const Stat = ({ label, value }) => (
  <View style={styles.statItem}>
    <Text style={styles.statValue}>{formatThousands(value)}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

export const RepositoryItem = ({ item }) => (
  <View style={styles.container}>
    <View style={styles.row}>
      <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
      <View style={styles.info}>
        <Text style={styles.fullName}>{item.fullName}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.language}>{item.language}</Text>
      </View>
    </View>
    <View style={styles.statsRow}>
      <Stat label="Stars" value={item.stargazersCount} />
      <Stat label="Forks" value={item.forksCount} />
      <Stat label="Reviews" value={item.reviewCount} />
      <Stat label="Rating" value={item.ratingAverage} />
    </View>
  </View>
);
