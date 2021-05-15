import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Image, Alert } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import waterDrop from '../assets/waterdrop.png'

import Header from '../components/Header';
import { loadPlant, PlantProps, removePlant } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyPlants() {

  const [myPlant, setMyPlant] = useState<PlantProps[]>([]);
  const [load, setLoad] = useState(true);
  const [nextPlant, setNextPlant] = useState<string>();

  function handleRemove(plant: PlantProps) {
    Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
      {
        text: 'Não 😃',
        style: 'cancel'
      },
      {
          text: 'Sim 😢',
          onPress: async () => {
            try{

              await removePlant(plant.id)
              
              setMyPlant((oldData) => 
                oldData.filter((item) => item.id !== plant.id)
              );

            }catch(error) {
              Alert.alert('Não foi possível remover!')
            }
          }

      }
    ])
  }

  useEffect(() => {
    async function loadStorage() {
      const plantStorage = await loadPlant();

      const nextTime = formatDistance(
        new Date(plantStorage[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        {locale: pt}
      );

      setNextPlant(
        `Não esqueça de regar a ${plantStorage[0].name} à ${nextTime}`
      )

      setMyPlant(plantStorage);
      setLoad(false);
    }

    loadStorage();

  }, [])

  if(load)
  return <Load />

  return(
    <View style={style.container}>
      <Header/>
      <View style={style.spotlight}>
        <Image source={waterDrop} style={style.spotlightImage}/> 
        <Text style={style.spotlightText}>{nextPlant}</Text>

      </View>
      <View style={style.plants}>
        <Text style={style.plantsTitle}>
          Próximas regadas
        </Text>

        <FlatList
          data={myPlant}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => (
            <PlantCardSecondary data={item} handleRemove={() =>{handleRemove(item)}}/>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>

    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:30,
    paddingTop:50,
    backgroundColor: colors.background,

  },

  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal:20,
    borderRadius:20,
    height:110,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },

  spotlightImage: {
    width:60,
    height:60
  },

  spotlightText: {
    flex:1,
    color:colors.blue,
    paddingHorizontal:20,
    
  },

  plants:{
    flex:1,
    width:'100%',

  },

  plantsTitle:{
    fontSize:24,
    fontFamily:fonts.heading,
    color: colors.heading,
    marginVertical:20,
  }

});