import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CityHeader = ({ cityName }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={styles.title}>{cityName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    flex: 1,
    fontSize: 26,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default CityHeader;
