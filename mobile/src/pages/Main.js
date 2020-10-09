import React,{ useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker, Callout }  from 'react-native-maps'
import { StyleSheet, Image, View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import InputMap from '../shared/InputMap';
import requestLocationPermission from '../services/androidLocationPermission';

import api from '../services/api';
import { connect, disconnect, subscribeToNewDevs } from '../services/socket';

export default function Main({ navigation }){
    const [devs,setDevs] = useState([]);
    const [currentRegion,setCurrentRegion] = useState(null)
    const [techs,setTechs] = useState('');
    
    function getLocation(){
        Geolocation.getCurrentPosition((location) => {
            console.log(location);
            const { coords } = location;
            setCurrentRegion({
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 0.04,
                longitudeDelta: 0.04
            })
        },(err) => {
            console.log(err);
        },{enableHighAccuracy: true, timeout: 20000, maxiumAge: 1000} )
    }
    useEffect(()=> {
         const isGranted = requestLocationPermission();
         
         if(isGranted){
             getLocation();
         }
    },[])

    useEffect(() => {
          subscribeToNewDevs(dev => setDevs([...devs,dev]));
    },[devs]);
function setupWebSocket(){
    
    disconnect();

    const { latitude, longitude } = currentRegion;

    connect(latitude, longitude, techs);
}
    async function loadDevs(){
        const { latitude, longitude } =  currentRegion;

        const response = await api.get('/search',{
            params: {
                latitude,
                longitude,
                techs
            }
        });
        setDevs(response.data.devs);
        setupWebSocket();
    };

    function handleRegionChange(region){
        console.log(region);
        setCurrentRegion(region);
    }

    if(!currentRegion){
        return null
    }

    return (
   
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
    <View style={styles.mapContainer} >
       <MapView
         onRegionChangeComplete={handleRegionChange}
         style={styles.map}
         initialRegion={currentRegion}
        >
           {devs.map( dev => (
               <Marker key={dev._id} coordinate={
                   {
                    latitude:dev.location.coordinates[1],
                    longitude:dev.location.coordinates[0]
                }} 
               >
               <Image style={styles.avatar}
               source={{uri: dev.avatar_url}} 
               />
               <Callout onPress={() => navigation.navigate('Profile',{github_username: dev.github_username})} >
                   <View style={styles.callout}>
                        <Text style={styles.devName} >{dev.name}</Text>
                        <Text style={styles.devBio} >{dev.bio}</Text>
                        <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                   </View>
               </Callout>
           </Marker>
           ))}
       </MapView>
       <InputMap 
            loadDevs={loadDevs}
            techs={techs}
            setTechs={setTechs}
       />
    </View>
    </TouchableWithoutFeedback>
    
    )
}

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff'
    },
    callout: {
        width: 260,
        height: 80
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    devBio: {
        color: '#666',
        marginTop: 5
    },
    devTechs: {
       marginTop: 5
    }
})
