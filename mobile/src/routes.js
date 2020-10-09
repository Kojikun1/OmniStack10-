import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();


// screens 
import Main from './pages/Main'
import Profile from './pages/Profile';


export default function MainContainer(){
    return (
        <NavigationContainer>
            <Stack.Navigator
             screenOptions={{
                headerStyle: {
                 backgroundColor: '#7D40E7'
                 },
                 headerTintColor: '#fff',
                 headerTitleAlign: 'center'
               }}
            >
                <Stack.Screen
                  name="Home"
                  component={Main}
                />
                <Stack.Screen
                  name="Profile"
                  component={Profile}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}