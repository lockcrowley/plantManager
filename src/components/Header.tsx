import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import colors from '../styles/colors';
import UserImg from '../assets/perfil2.png';
import fonts from '../styles/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Header(){
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    async function loadStorageUserName(){
        const user = await AsyncStorage.getItem('@plantmanager:user')
        setUserName(user || '');
    }

    loadStorageUserName();

  }, [])

  return(
    <View style={style.container}>
      <View>
        <Text style={style.greting}>Olá,</Text>
        <Text style={style.user}>{userName}</Text>
      </View>

      <Image source={UserImg} style={style.image}/>

    </View>
  )
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop:20,
  },

  greting: {
    fontSize:32,
    color: colors.heading,
    fontFamily: fonts.text,
  },

  user: {
    fontSize:32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40,

  },

  image: {
    width:80,
    height:80,
    borderRadius: 40,
  }
})