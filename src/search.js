import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { EvilIcons } from '@expo/vector-icons';

const Weathersearch = ({ fetchWeather }) => {
  const [cityName, setCityName] = useState('');

  return (
    <View style={styles.searchbar}>
      <TextInput
        placeholder='Search city'
        value={cityName}
        onChangeText={(text) => setCityName(text)}
      />
      <EvilIcons
        name='search'
        size={28}
        color='black'
        onPress={() => fetchWeather(cityName)}
      />
    </View>
  );
};

export default Weathersearch;

const styles = StyleSheet.create({
  searchbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width - 20,
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 25,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
});
