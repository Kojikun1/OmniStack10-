import { PermissionsAndroid } from 'react-native'

async function requestLocationPermission(){
    try{
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': "App Location Permission",
                'message': "Maps App needs access to your map so you can be navigated"
            }
        );
        if(granted === PermissionsAndroid.RESULTS.GRANTED){
             console.log("You can use the location");
             return true;
        }else{
            console.log("Location permission denied");
            return false;
        };
    }catch(err){
        console.warn(err);
    };
};

export default requestLocationPermission