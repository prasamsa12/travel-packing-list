// client/src/components/TripDetailsForm.js
import React, { useState } from 'react';
import axios from 'axios';

const TripDetailsForm = ({ setPackingList }) => {
  const [destination, setDestination] = useState('');
  const [travelDates, setTravelDates] = useState({ start: '', end: '' });
  const [activities, setActivities] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/get-packing-list', {
        destination,
        travelDates,
        activities,
      });
      setPackingList(response.data.packingList);
    } catch (error) {
      console.error("Error fetching packing list", error);
    }
  };

  return (
    <div>
      <h2>Enter Trip Details</h2>
      <input
        type="text"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Destination"
      />
      <input
        type="date"
        value={travelDates.start}
        onChange={(e) => setTravelDates({ ...travelDates, start: e.target.value })}
        placeholder="Start Date"
      />
      <input
        type="date"
        value={travelDates.end}
        onChange={(e) => setTravelDates({ ...travelDates, end: e.target.value })}
        placeholder="End Date"
      />
      <label>Activities:</label>
      <select multiple onChange={(e) => setActivities([...e.target.selectedOptions].map(o => o.value))}>
        <option value="beach">Beach</option>
        <option value="hiking">Hiking</option>
        <option value="city_tour">City Tour</option>
      </select>
      <button onClick={handleSubmit}>Get Packing List</button>
    </div>
  );
};

export default TripDetailsForm;
