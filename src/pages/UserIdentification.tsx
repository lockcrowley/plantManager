import React, {useState} from 'react';
import {View, Text, TouchableWithoutFeedback, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedbackBase, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage'

import Button from '../components/Button'
import colors from '../styles/colors';
import fonts from '../styles/fonts';


export default function UserIdentification(){

  const [isFocus, setIsFocus] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();

  const navigation = useNavigation();

  async function handleSubmit(){
    if(!name)
      return Alert.alert('Me diz como chamar você 😥')

    try{
      await AsyncStorage.setItem('@plantmanager:user', name);
      navigation.navigate('Confirmation', {
        title: 'Prontinho',
        subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
        buttonTitle: 'Começar',
        icon: 'smile',
        nextScreen:'PlantSelect' 
      })
    }catch{
      Alert.alert('Não foi possivel salvar o seu nome 😥')
    }

    
  }

  function handleInputBlur(){
    setIsFocus(false);
    setIsFilled(!!name);
  }
  
  function handleInputFocus(){
    setIsFocus(true);
  }

  function handleInputChanged( value: string){
    setIsFilled(!!value)
    setName(value);
  }

  return(
    <View style={style.container}> 
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={style.content}>
          <View style={style.form}>
            <View>
              <Text style={style.emoji}>
                  {isFilled ? '😄' : '🙂 '}
              </Text>
              <Text style={style.title}>
                Como Podemos {'\n'} 
                chamar você?

              </Text>
            </View>

            <TextInput 
              style={[
                style.input,
                (isFocus || isFilled) &&
                {borderColor: colors.green}
              ]}
              placeholder="Digite seu nome"
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              onChangeText={handleInputChanged}
            />

            <View style={style.footer} >
              <Button title="Confirmar" onPress={handleSubmit}/>
            </View>

          </View>

        </View>
      </TouchableWithoutFeedback>
    </View>
  )
};

const style = StyleSheet.create({
  container: {
    flex:1,
    width:'100%',
    alignItems:'center',
    justifyContent:'space-around',
  },
  
  content: {
    flex:1,
    width:'100%',

  },

  form: {
    flex:1,
    justifyContent:'center',
    paddingHorizontal:54,
    alignItems:'center',

  },

  emoji: {
    fontSize:44,
    alignSelf:'center'
  },
  
  input: {
    borderBottomWidth:1,
    borderColor: colors.gray,
    color: colors.heading,
    width:'100%',
    fontSize:18,
    marginTop:50,
    padding:10,
    textAlign:'center',
  },
  
  title: {
    fontSize:24,
    textAlign:'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight:32,
    marginTop:20,

  },

  footer: {
    marginTop:40,
    width:'100%',
    paddingHorizontal:20,
  }
});