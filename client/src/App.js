// client/src/App.js
import React, { useState } from 'react';
import TripDetailsForm from './components/TripDetailsForm';

function App() {
  const [packingList, setPackingList] = useState([]);

  return (
    <div className="App">
      <h1>AI Travel Packing List</h1>
      <TripDetailsForm setPackingList={setPackingList} />
      <div>
        <h2>Packing List</h2>
        <ul>
          {packingList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
