import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import Header from '../components/Header';

import {Load} from '../components/Load';
import EnviromentButton from '../components/EnviromentButton';
import api from '../services/api';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { PlantProps } from '../libs/storage';

interface EnviromentProps{
  key:string;
  title:string;
}


export default function PlantSelect(){

  const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [enviromentSelected, setEnviromentSelected] = useState('all');
  const [load, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadingMore] = useState(false);

  const navigation = useNavigation();

  function handleEnviromentSelected(environment: string){
    setEnviromentSelected(environment);

    if(environment == 'all')
    return setFilteredPlants(plants);

    const filtered = plants.filter(plant => 
        plant.environments.includes(environment)
      );

      setFilteredPlants(filtered);
  }

  async function fetchPlants(){
    const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

    if(!data)
    return setLoading(true);

    if(page > 1){
      setPlants(oldValue => [...oldValue, ...data])
      setFilteredPlants(oldValue => [...oldValue, ...data])
    }else{
      setPlants(data); 
      setFilteredPlants(data);
    }

    setLoading(false)
    setLoadingMore(false)
  }

  function handleFetchMore(distance: number){
    if(distance < 1)
      return;

      setLoadingMore(true);
      setPage(oldValue => oldValue + 1)
      fetchPlants();
  }

  function handlePlantSelect(plant: PlantProps){
    navigation.navigate('PlantSave', {plant});
  }

  useEffect(() => {
    async function fetchEnviroment(){
      const { data } = await api.get('plants_environments?_sort=title&_order=asc');
      setEnviroments([
        {
          key: 'all',
          title: 'Todos',
        },
        ...data
      ])
    }

    fetchEnviroment(); 

  },[])

  useEffect(() => {
    fetchPlants(); 

  },[])

  if(load)
  return <Load />

  return(
    <View style={style.container}>
      <View style={style.header}>
        <Header/>
        <Text style={style.title}>Em qual ambiente</Text>
        <Text style={style.subtitle}>você quer colocar sua planta?</Text>

      </View>

      <View> 
        <FlatList
          data={enviroments}
          keyExtractor={(item) => String(item.key)}
          renderItem={({item}) => (
            <EnviromentButton 
              title={item.title}  
              active={item.key === enviromentSelected}
              onPress={() => handleEnviromentSelected(item.key)}
            />
            
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={style.enviromentList}
        />
      </View>

      <View style={style.plant}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => (
            <PlantCardPrimary data={item} onPress={() => handlePlantSelect(item)}/>  
          )} 
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => 
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadMore
            ?<ActivityIndicator color={colors.green}/>
            :<></>
          }
        />
      </View>
      
    </View>
  )
};

const style = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: colors.background,
  },

  header: {
    paddingHorizontal:30,
  },

  title: {
    fontSize:17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight:20,
    marginTop:15,
  },

  subtitle: {
    fontSize:17,
    color: colors.heading,
    fontFamily: fonts.text,
    lineHeight:20
  },

  enviromentList: {
    height: 40,
    justifyContent:'center',
    paddingBottom:5,
    marginHorizontal:32,
    marginVertical:32,
    paddingHorizontal:30
  },

  plant: {
    flex:1,
    paddingHorizontal:32,
    justifyContent:'center',
  },

})