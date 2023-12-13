import React from 'react';
import { SafeAreaView, StyleSheet, Image, Dimensions, View, Text, TouchableOpacity, DrawerLayoutAndroid } from 'react-native';
import Weathersearch from './search';
import CityHeader from './header';

const Weatherinfo = ({ weatherData, fetchWeather }) => {

  // Check if weatherData is available before rendering it
  if (weatherData) {
    // Converting temperature from kelvin to celsius
    const temperatureInCelsius = (weatherData.main.temp - 273.15).toFixed(2);
    const temperatureInCelsius2 = (weatherData.main.feels_like - 273.15).toFixed(2);

    const {
      name,
      weather: [{ icon, description }],
    } = weatherData;

    // Refresh function
    const refreshWeather = () => {
      fetchWeather(weatherData.name); // Example: Refresh with the city 'Tampere'
    };

    return (
      <SafeAreaView style={styles.container}>
        <Weathersearch fetchWeather={fetchWeather} />

        <TouchableOpacity onPress={refreshWeather} style={styles.refreshButton}>
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>

        <CityHeader cityName={weatherData.name} />

        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Image style={styles.smallicon3} source={require('../assets/temp.png')} />
            <Text>Temperature</Text>
            <Text style={styles.windspeed}>{temperatureInCelsius}°C</Text>
          </View>
          <View style={styles.info}>
            <Image style={styles.smallicon2} source={require('../assets/feels.png')} />
            <Text>Feels like</Text>
            <Text style={styles.windspeed}>{temperatureInCelsius2}°C</Text>
          </View>
        </View>

        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Image style={styles.smallicon} source={{ uri: `http://openweathermap.org/img/wn/${icon}.png` }} />
            <Text>Weather</Text>
            <Text style={styles.windspeed}>{description}</Text>
          </View>

          <View style={styles.info}>
            <Image style={styles.smallicon} source={require('../assets/wind.png')} />
            <Text>Windspeed</Text>
            <Text style={styles.windspeed}>{weatherData.wind.speed} m/s</Text>
          </View>

        </View>

        <View >
          <Text style={styles.subtitle}>Hourly forecast</Text>
        </View>


      </SafeAreaView>
    );
  } else {
    // Message when weatherData is not available
    return (
      <View>
        <Weathersearch fetchWeather={fetchWeather} />
        <Text>No weather data available</Text>
      </View>
    );
  }
};

export default Weatherinfo;

const styles = StyleSheet.create({
  container: {

    marginTop: 15,
  },

  extraInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  info: {
    width: Dimensions.get('screen').width / 2.5,
    backgroundColor: '#fcebfc',
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  smallicon: {
    width: 90,
    height: 60,
    marginLeft: 50,
  },
  smallicon2: {
    width: 30,
    height: 50,
    marginLeft: 50,
  },

  smallicon3: {
    width: 20,
    height: 50,

    marginLeft: 50,
  },

  windspeed: {
    marginTop: 5,
    fontSize: 16,
  },

  refreshButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  refreshButtonText: {
    color: 'black',
    fontSize: 16,
  },

  subtitle: {
    fontSize: 20,
    marginVertical: 12,
    marginLeft: 7,
    color: 'black',

  }
});
