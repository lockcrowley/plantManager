import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet, Alert, Image, Platform, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import {SvgFromUri} from 'react-native-svg'
import DateTimePicker, {Event} from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import waterDrop from '../assets/waterdrop.png'

import Button from '../components/Button';
import { PlantProps, savePlant } from '../libs/storage';


interface Params{
  plant: PlantProps
}

export default function PlantSave(){

  const navigation = useNavigation();
  const route = useRoute();

  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');

  const { plant } = route.params as Params;

  function handleChangeTime(event: Event, dateTime: Date | undefined){
    if(Platform.OS === 'android'){
      setShowDatePicker(oldState => !oldState)
    }

    if(dateTime && isBefore(dateTime, new Date())){
      setSelectedDateTime(new Date());
      return Alert.alert('Escolha uma hora no futuro! ⏰')
    }

    if(dateTime)
      setSelectedDateTime(dateTime)
  }

  function handleOpenDateTime(){
    setShowDatePicker(oldState => !oldState); 
  }

  async function handleSave(){
    
    try{
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime
      });

      navigation.navigate('Confirmation', {
        title: 'Tudo certo',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado',
        buttonTitle: 'Muito Obrigado',
        icon: 'hug',
        nextScreen:'MyPlant' 
      })

    }catch{
      Alert.alert('Não foi possivel salvar planta 😢')
    }
  }

  return(
    <ScrollView 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={style.container}
    >
      <View style={style.container}>
        <View style={style.plantInfo}>
          <SvgFromUri
            uri={plant.photo}
            height={150}
            width={150}
          />

          <Text style={style.plantName}>
            {plant.name}
          </Text>
          <Text style={style.plantAbout}>
            {plant.about}
          </Text>

        </View>

        <View style={style.controllers}>
          <View style={style.tipContainer}>
            <Image source={waterDrop} style={style.tipImage}/>

            <Text style={style.tipText}>
              {plant.water_tips}
            </Text>
          </View>

          <Text style={style.waterLabel}>
            Escolha o melhor horário para ser lembrado:
          </Text>

          { showDatePicker && (
            <DateTimePicker 
          value={selectedDateTime} 
          mode="time"
          display="spinner"
          onChange={handleChangeTime}
          /> 
          )}

          {
            Platform.OS === 'android' && (
              <TouchableOpacity onPress={handleOpenDateTime} style={style.dataTimeButton}>
                <Text style={style.dataTimeText}>{`Mudar ${format(selectedDateTime, 'HH:mm')}`}</Text>
              </TouchableOpacity>
            )
          }

          <Button title="Cadastrar planta" onPress={handleSave}/>

        </View> 
      </View>
    </ScrollView>
  )
};

const style = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'space-between',
      backgroundColor: colors.shape,

    },

    plantInfo: {
      flex:1,
      paddingHorizontal:30,
      paddingVertical:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:colors.shape,

    },

    controllers: {
      backgroundColor:colors.white,
      paddingHorizontal:20,
      paddingTop:20,
      paddingBottom: 20,

    },

    plantName: {
      fontFamily:fonts.heading,
      fontSize:24,
      color: colors.heading,
      marginTop:15,

    },

    plantAbout: {
      textAlign:'center',
      fontFamily: fonts.text,
      color: colors.heading,
      fontSize:17,
      marginTop:10,

    },

    tipContainer: {
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      backgroundColor:colors.blue_light,
      padding:20,
      borderRadius:20,
      position:'relative',
      bottom:60

    },

    tipText:{
      flex:1,
      marginLeft:20,
      fontFamily:fonts.text,
      color: colors.blue,
      fontSize:17,
      textAlign:'justify'
    },

    tipImage: {
      width:56,
      height:56,

    },

    waterLabel: {
      textAlign:'center',
      fontFamily:fonts.complement,
      color:colors.heading,
      fontSize:12,
      marginBottom:5,

    },

    dataTimeButton: {
      width: '100%',
      alignItems:'center',
      paddingVertical:40,
  
    },

    dataTimeText: {
      color: colors.heading,
      fontSize:24,
      fontFamily: fonts.text, 
    },

});
