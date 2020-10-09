import React from 'react';

import './global.css';
import './App.css';

import Sidebar from './components/Sidebar';
import Main from './components/Main';

function App(){
 
    return (
        <div id='app'>
          <Sidebar />
          <Main />
        </div>
    )
}

export default App;