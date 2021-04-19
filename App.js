import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Form from './components/Form';
import Weather from './components/Weather';

const App = () => {
  const [ search, setSearch ] = useState({ city: '', country: '' });
  const [ consult, setConsult ] = useState(false);
  const [ responseApi, setResponseApi ] = useState({});
  const [ bg, setBg ] = useState('#f9f9ff');
  const hideKeyboard = () => Keyboard.dismiss();

  const { city, country } = search;
  
  useEffect(() => {
    const consultWeather = async () => {
      if(consult){
        const appId = '0495b0491d863a59d24581f036008737';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;
        try {
          const response = await fetch(url);
          const result = await response.json(); 
          setResponseApi(result);
          setConsult(false);

          const kelvin = 273.15; 
          const { main } = result;
          const actual = main.temp - kelvin;
          console.log(actual);

          if(actual < 16){
            setBg('#0077cc')
          } else if(actual >= 16 && actual < 25){
            setBg('#07c')
          } else {
            setBg('rgb(178,28,61)')
          }
        } catch (error) {
          showAlert()
        }
      }
    };
    consultWeather();
  }, [consult])

  const showAlert = () => Alert.alert('Error', 'No hay resultados para esta busqueda', [{ text: 'OK' }]);
  
  const bgApp = {
    backgroundColor: bg
  }

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={[styles.app, bgApp]}>
        <SafeAreaView/>
        <Weather responseApi={responseApi}/>
        <Form bg={bg} search={search} setSearch={setSearch} setConsult={setConsult}/>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  app: {
    paddingHorizontal: '5%',
    flex: 1
  }
});

export default App;
