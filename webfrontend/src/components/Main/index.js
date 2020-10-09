import React,{ useState, useEffect } from 'react';
import api from '../../services/api';
import DevItem from '../DevItem';

import './Main.css';

export default function Main(){
    const [devs,setDevs] = useState([]);
    
    useEffect(() => {
        async function loadDevs(){
            const response = await api.get('/devs');
            setDevs(response.data);
        }
        loadDevs();
    },[])

    return (
        <main>
               <ul>
                   {devs.map(dev => (
                      <DevItem  key={dev._id}  dev={dev} />
                   ))}
               </ul>
              
           </main>
    )
}