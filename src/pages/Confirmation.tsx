import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

import Button from '../components/Button'
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params{
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hug',
  nextScreen: string;
}

const emojis = {
  hug:'🤗',
  smile: '😄'
}

export default function Confirmation(){

  const navigation = useNavigation();
  const routes = useRoute();

  const {
    title,
    subtitle,
    buttonTitle,
    icon,
    nextScreen
  } = routes.params as Params

  function handleMoveOn(){
    navigation.navigate(nextScreen)
  }
  return(
    <View style={style.container}>
      <View style={style.content}>
        <Text style={style.emoji}>
            {emojis[icon]}
        </Text>

        <Text style={style.title}>
          {title}
        </Text>

        <Text style={style.subtitle}>
          {subtitle}
        </Text>

        <View style={style.footer}>
          <Button title={buttonTitle} onPress={handleMoveOn}/>
        </View>
      </View>
    </View>
  )
};

const style = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'space-around'
  },  

  content:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width:'100%', 
  },

  emoji: {
    fontSize:78,
  },

  title: {
    fontSize:22,
    fontFamily:fonts.heading,
    textAlign:'center',
    color: colors.heading,
    lineHeight:38,
    marginTop:15,
  },

  subtitle: {
    fontFamily:fonts.heading,
    textAlign:'center',
    fontSize:17,
    paddingVertical:10,
    color:colors.heading,
  },
  footer: {
    width:'100%',
    paddingHorizontal: 75,
    marginTop:20,
  },

});