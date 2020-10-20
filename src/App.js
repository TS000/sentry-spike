import React, { useState } from 'react';
import './App.css';
import { request } from './fakeRequest'

const App = () => {
  const [ newData, setData ] = useState('no data');

  const fetcher = () => {
  fetch(request)
    .then((response) => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }
      response.json().then(function(data) {
        console.log(data);
        setData(data)
      });
    })
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => fetcher()} style={{padding: "40, 100"}}>Break the world</button>
        <h4>Data: {newData}</h4>
      </header>
    </div>
  );
}

export default App;
