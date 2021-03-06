import 'react-native-gesture-handler';
import React from 'react'
import { StatusBar, YellowBox } from 'react-native';

import MainContainer from './src/routes'

YellowBox.ignoreWarnings([
    'Unrecognized WebSocket'
])

export default function App(){
  return (
    <>
      <StatusBar  barStyle='light-content' backgroundColor='#7D40E7' />
      <MainContainer />
    </>
  )
}
