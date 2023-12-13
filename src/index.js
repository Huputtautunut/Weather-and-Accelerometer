import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import Weatherinfo from './Weatherinfo';
import WeatherForecast from './ListItem';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const API_KEYS = 'c5fd91b1a01cf561c9db62fde987e497';

const Weather = ({ navigation }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [searchedCity, setSearchedCity] = useState('Tampere'); // Default city

  const Stack = createStackNavigator();



  const fetchWeather = async (cityName) => {
    try {
      setLoaded(false);

      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEYS}`
      );

      if (response.status === 200) {
        const data = await response.json();
        setWeatherData(data);
        setSearchedCity(cityName); // Update searched city
      } else {
        setWeatherData(null);
      }

      setLoaded(true);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    fetchWeather(searchedCity);
  }, [searchedCity]);



  if (!loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='red' />
      </View>
    );
  }

  return (


      <View style={styles.container}>
        <TouchableOpacity
        onPress={() => navigation.navigate('Screen2')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Go to accelerometer</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{searchedCity}</Text>
        <View style={styles.content}>
          <Weatherinfo weatherData={weatherData} fetchWeather={fetchWeather} />
          <WeatherForecast searchedCity={searchedCity} />
        </View>
      </View>



  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcd9fb',
    paddingTop: Constants.statusBarHeight - 20,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#ff80ce',
    height: 80,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    flexDirection: 'column', // Stack components vertically
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',

  },
  buttonText: {
    color: 'black',
    fontSize: 16,},


  menuButton: {
    borderRadius: 15,
    backgroundColor:'#ffd4de',

  },
  menuButtonText: {
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 28,
    justifyContent: 'center',
    alignSelf: 'center',
  },

});

export default Weather;