import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Weather = ({ responseApi }) => {
  const { name, main } = responseApi;
  if(!name) return <View style={styles.content}></View>;

  const kelvin = 273.15;

  return (
    <View style={styles.content}>
      <Text style={styles.main}>
        {parseInt(main.temp - kelvin)}
        <Text style={styles.temp}>&#x2103;</Text>
      </Text>

      <View style={styles.temps}>
        <Text style={styles.otherTemps}>
          {parseInt(main.temp_min - kelvin)} &#x2103;
        </Text>

        <Text style={styles.otherTemps}>
          {parseInt(main.temp_max - kelvin)} &#x2103;
        </Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
    marginVertical: 16,
    borderRadius: 8,
    justifyContent: 'center',
    height: 200
  },
  main: {
    fontSize: 64,
    textAlign: 'center',
    color: 'white',
  },
  temp: {
    fontSize: 32
  },
  temps: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  otherTemps: {
    marginHorizontal: 16,
    marginTop: 12,
    fontSize: 20,
    color: 'white'
  }
})

export default Weather
