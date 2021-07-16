import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native'

import Colors from './src/res/colors'

import CoinsStack from './src/components/coins/CoinStack';
import FavoritesStack from './src/components/favorites/favoritesStack';

const Tabs = createBottomTabNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions = {{
          tintColor:'#fefefe',
          labelStyle: {
            fontSize: 12,
          },
          style:{
            backgroundColor:Colors.blackPearl
          }
        }}
      >
        <Tabs.Screen 
          name="coins"
          component = {CoinsStack} 
          options ={{
            tabBarIcon:({ color, size }) => {
              return  <Image 
                style={{ tintColor:color, width:size, height:size}}
                source={require('./src/assets/bank.png')} 
              />
            }
          }}
        />
        <Tabs.Screen 
          name="favorites"
          component = {FavoritesStack} 
          options ={{
            tabBarIcon:({ color, size }) => {
              return  <Image 
                style={{ tintColor:color, width:size, height:size}}
                source={require('./src/assets/star.png')} 
              />
            }
          }}
          
        />
        
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;
