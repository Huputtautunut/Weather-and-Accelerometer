import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const AccelerometerComponent = () => {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  useEffect(() => {
    const subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>The current acceleration of your phone:</Text>
      <View style={styles.box}><Text style={styles.text}>X: {data.x.toFixed(2)}m/s²</Text></View>
      <View style={styles.box}><Text style={styles.text}>Y: {data.y.toFixed(2)}m/s²</Text></View>
      <View style={styles.box}><Text style={styles.text}>Z: {data.z.toFixed(2)}m/s²</Text></View>
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
    fontSize: 18,
    marginBottom: 10,
  },
  box: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default AccelerometerComponent;
