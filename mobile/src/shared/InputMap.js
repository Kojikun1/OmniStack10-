import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const myIcon = <Icon name="my-location" size={30}  color='#fff' />

export default function InputMap({ loadDevs, techs, setTechs }){
    return (
        <View style={styles.inputContainer} >
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar devs por techs..."
              placeholderTextColor="#999"
              autoCapitalize="words"
              autoCorrect={false}
              value={techs}
              onChangeText={setTechs}
            />
            <TouchableOpacity onPress={loadDevs} style={styles.loadButton} >
                    {myIcon}
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    inputContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },
     searchInput: {
         flex: 1,
         height: 50,
         borderRadius: 25,
         backgroundColor: '#fff',
         paddingHorizontal: 20,
         fontSize: 16,
         shadowColor: '#000',
         shadowOpacity: 0.2,
         shadowOffset: {
             width: 4,
             height: 4
         },
         elevation: 2
     },
     loadButton: {
         width: 50,
         height: 50,
         borderRadius: 25,
         backgroundColor: '#8E4Dff',
         alignItems: 'center',
         justifyContent: 'center',
         marginLeft: 15
     }
})
