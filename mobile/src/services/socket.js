import socketio from 'socket.io-client';
import api_url from '../../data_env';

const socket = socketio(api_url,{
    autoConnect: false
})

function subscribeToNewDevs(subscribeFunction){
    socket.on('new-dev', subscribeFunction);
}

function connect(latitude, longitude, techs){
    
    socket.io.opts.query = {
        latitude,
        longitude,
        techs,
    }

    socket.connect();

    socket.on('message', text => {
        console.log(text);
    });
}

function disconnect(){
    if(socket.connected){
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribeToNewDevs
}