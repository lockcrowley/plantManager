import React, {useState} from 'react';
import {View, Text, StyleSheet } from 'react-native';
import {RectButton, RawButtonProps, RectButtonProps} from 'react-native-gesture-handler'; 

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentButtonProps extends RectButtonProps{
  title: string;
  active?: boolean;
}

export default function EnviromentButton({ 
  title, 
  active = false, 
  ...rest
  } : EnviromentButtonProps){
  return(
    <RectButton 
      style={[
        style.container,
        active && style.containerActive
      ]} 
      {...rest}
    >
      <Text
        style={[
          style.text,
          active && style.textActive
        ]} 
      >
        {title}
        </Text>
    </RectButton>
  )
};

const style = StyleSheet.create({
  container: {
    width: 76,
    height: 40,
    backgroundColor: colors.shape,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 5,
    left:-20

  },

  containerActive: {
    backgroundColor: colors.green_light,
  },

  text: {
    color: colors.heading,
    fontFamily: fonts.text,
  },

  textActive: {
    fontFamily: fonts.heading,
    color: colors.green_dark,
  }
});