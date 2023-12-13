
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AccelerometerComponent from './AccelerometerComponent';
import { ToastAndroid } from 'react-native';


const Screen2 = ({ navigation }) => {
  useEffect(() => {
    // Display a toast message when Screen2 is loaded
    ToastAndroid.show('Welcome to Accelerometer!', ToastAndroid.SHORT);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Accelerometer</Text>
      {/* Display Accelerometer Component */}
      <AccelerometerComponent />
      <TouchableOpacity
        onPress={() => navigation.navigate('Weather')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Go back to weather</Text>
      </TouchableOpacity>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop:200,
    fontSize: 24,

  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 200,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Screen2;
