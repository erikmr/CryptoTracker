import React from  'react'
import { createStackNavigator } from '@react-navigation/stack'
import FavoritesScreen from './favoritesScreen'
import Colors from '../../res/colors'
const Stack = createStackNavigator()

const FavoritesStack =()=>{
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle :{
                    backgroundColor: Colors.blackPearl,
                    shadowColor: Colors.blackPearl,
                },
                headerTintColor:Colors.white
            }}        
        >
            <Stack.Screen 
                name="Favorites" 
                component={FavoritesScreen}
            />
        </Stack.Navigator>
    )
}
export default FavoritesStack;