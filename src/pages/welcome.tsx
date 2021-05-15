import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import water from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { Feather } from '@expo/vector-icons'


export function Welcome(){

  const navigation = useNavigation();

  function handleStart(){
    navigation.navigate('UserIdentification')
  }

  return (
    <View style={style.container}>
      <View style={style.wrapper}>
        <Text style={style.title}>
          Gerencie {'\n'}
          suas plantas de {'\n'}
          forma fácil
          </Text>

        <Image 
          source={water} 
          style={style.image}
          resizeMode="contain"
        
        />

        <Text style={style.subtitle}>Não esqueça mais de regar suas plantas. 
              Nós cuidamos de lembrar você sempre que precisar
        </Text>

        <TouchableOpacity style={style.button} activeOpacity={0.7} onPress={handleStart}>
            <Feather name="chevron-right" style={style.icon}/>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around', 

  },

  wrapper:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around', 
    paddingHorizontal:20,
  },

  title:{
    fontSize: 28,
    fontWeight: 'bold',
    textAlign:'center',
    color: colors.heading,
    marginTop:38,
    fontFamily:fonts.heading,
    lineHeight:34

  },

  subtitle:{
    textAlign:'center',
    fontSize:18,
    paddingHorizontal:20,
    color: colors.heading,
    fontFamily:fonts.text,
  },

  image:{
    height: Dimensions.get('window').width * 0.7,

  },

  button:{
    backgroundColor: colors.green,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:16,
    marginBottom:10,
    height:56,
    width:56,
    paddingHorizontal:10,
  },

  icon: {
    color: colors.white,
    fontSize:32
  },

});