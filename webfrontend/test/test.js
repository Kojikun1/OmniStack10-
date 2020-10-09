import React, { useState, useEffect } from 'react';


export default function App() {
  const [resourceType,setResourceType] = useState('posts');
  const [apiData,setApiData] = useState([]);

  
  
  useEffect(()=> {
      fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
      .then( response => response.json())
      .then(data => setApiData(data) );
  },[resourceType])


  return (
    <div className="App">
      <button onClick={()=> setResourceType('posts') }>Post</button>
      <button onClick={()=> setResourceType('users') }>Users</button>
      <button onClick={()=> setResourceType('comments') }>Comments</button>

      <h2>{resourceType}</h2>
      {apiData.map(item => {
        return (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.email}</p>
          </div>
        )
      } )}
    </div>
  );
}



