import React, { useState } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, StyleSheet, Animated, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker';

const Form = ({ search, setSearch, setConsult, bg }) => {
  const { city, country } = search;
  const [ animationButton ] = useState(new Animated.Value(1));

  const animationIn = () => {
    Animated.spring(animationButton, {
      toValue: .95,
      useNativeDriver: true
    }).start();
  }
  const animationOut = () => {
    Animated.spring(animationButton, {
      toValue: 1,
      friction: 4,
      tension: 30,
      useNativeDriver: true
    }).start();
  };

  const animationStyle = { transform: [{ scale: animationButton }] };

  const getWeather = () => {
    if(city.trim() === '' || country.trim() === ''){
      showAlert();
      return;
    };
    setConsult(true);
  };

  const showAlert = () => Alert.alert('Error', 'Todos los campos son obligatorios', [{ text: 'OK' }]);

  return (
    <>
      <View style={[styles.container, {backgroundColor: bg}]}>
        <View style={styles.topShadow}>
          <View>
            <TextInput
              placeholder="ciudad"
              value={city}
              onChangeText={city => setSearch({ ...search, city })}
              style={styles.input}
            />
          </View>

          <View>
            <Picker
              selectedValue={country}
              itemStyle={{ height: 120 }}
              onValueChange={country => setSearch({ ...search, country })}
            >
              <Picker.Item label="Seleccione" value=""/> 
              <Picker.Item label="Estados Unidos" value="US"/>
              <Picker.Item label="Argentina" value="AR"/>
              <Picker.Item label="Colombia" value="Co"/>
              <Picker.Item label="Mexico" value="MX"/>
              <Picker.Item label="Peru" value="PE"/>
              <Picker.Item label="Costa Rica" value="CR"/>
            </Picker>
          </View>
        </View>
      </View>

      <TouchableWithoutFeedback
        onPressIn={animationIn}
        onPressOut={animationOut}
        onPress={getWeather}
      >
        <Animated.View style={[styles.topShadow, animationStyle]}>
          <View style={[styles.button, {backgroundColor: bg}]}>
            <Text>
              Buscar 
            </Text>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    shadowOffset:{  width: 4,  height: 4,  },
    shadowColor: 'rgba(10,22,70,.12)',
    shadowOpacity: 1.0,
  },
  button: {
    height: 48,
    backgroundColor: '#f9f9ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 32,
    shadowOffset:{  width: 4,  height: 4,  },
    shadowColor: 'rgba(10,22,70,.12)',
    shadowOpacity: 1.0,
  },
  topShadow: {
    shadowOffset:{  width: -4,  height: -4,  },
    shadowColor: 'rgba(255,255,255,.3)',
    shadowOpacity: 1.0,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#eee',
    padding: 16
  }
});

export default Form;
