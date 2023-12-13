import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, FlatList, Image } from 'react-native';
import Constants from 'expo-constants';

const API_KEY = 'c5fd91b1a01cf561c9db62fde987e497';

const WeatherForecast = ({ searchedCity }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const fetchWeather = async (cityName) => {
    try {
      setLoaded(false);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`
      );

      if (response.status === 200) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        setWeatherData(null);
      }

      setLoaded(true);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeather(searchedCity);
  }, [searchedCity]);

  if (!loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  const combinedList = weatherData && weatherData.list
  ? weatherData.list.map((item) => {
      const date = new Date(item.dt_txt);
      const formattedDate = date.toLocaleString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      });

      return {
        time: formattedDate,
        temperature: (item.main.temp - 273.15).toFixed(2),
        wind: item.wind.speed,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      };
    })
  : [];

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={combinedList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.items}>
            <Text>{item.time}</Text>
            <Image style={styles.smallicon} source={{ uri: `http://openweathermap.org/img/wn/${item.icon}.png` }} />
            <Text>{item.description}</Text>
            <Text>{item.temperature } °C</Text>
            <Text>{item.wind} m/s</Text>
          </View>
        )}
      />
    </View>
  );
};

export default WeatherForecast


const styles = StyleSheet.create({
    items: {
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginRight: 10, // Add margin to create space between items
        borderRadius: 10, // Optional: Add borderRadius for a nicer look
        backgroundColor: '#ffbfbf', // Optional: Set a background color
        marginBottom: 10,

      },

    smallicon: {
        width: 90,
        height: 40,
        marginLeft: 50,
      },

  });
