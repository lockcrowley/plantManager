import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { Welcome } from '../pages/welcome';
import UserIdentification from '../pages/UserIdentification';
import Confirmation from '../pages/Confirmation';
import AuthRoutes from './tab.routes';
import PlantSave from '../pages/PlantSave';
import MyPlants from '../pages/MyPlants';

const StackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
  <StackRoutes.Navigator 
    headerMode="none" 
    screenOptions={{
        cardStyle: {
          backgroundColor:colors.white
      },
    }}
  >

    <StackRoutes.Screen name="Welcome" component={Welcome}/>
    <StackRoutes.Screen name="UserIdentification" component={UserIdentification}/>
    <StackRoutes.Screen name="Confirmation" component={Confirmation}/>
    <StackRoutes.Screen name="PlantSelect" component={AuthRoutes}/>
    <StackRoutes.Screen name="PlantSave" component={PlantSave}/>
    <StackRoutes.Screen name="MyPlant" component={AuthRoutes}/>
    

  </StackRoutes.Navigator>
)

export default AppRoutes;

