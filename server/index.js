// server/index.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Add your OpenWeatherMap API key here (replace with your actual key)
const WEATHER_API_KEY = 'c5710fabd89005d2961012fcd97379e1';

// Fetch weather data based on destination
async function getWeather(destination) {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=${WEATHER_API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

app.post('/get-packing-list', async (req, res) => {
  const { destination, travelDates, activities } = req.body;
  
  let packingList = [];
  
  // Get weather data for destination
  const weather = await getWeather(destination);
  const temperature = weather ? weather.main.temp : null;
  const weatherCondition = weather ? weather.weather[0].main.toLowerCase() : null;
  
  // Basic essentials
  packingList.push('Passport', 'Phone Charger', 'Toiletries', 'Medications');

  // Weather-based recommendations
  if (temperature !== null) {
    if (temperature > 25) {
      packingList.push('Sunglasses', 'Sunscreen', 'Light Clothing', 'Hat');
    } else if (temperature <= 25 && temperature >= 15) {
      packingList.push('Jacket', 'Long Pants', 'Light Sweater');
    } else if (temperature < 15) {
      packingList.push('Warm Jacket', 'Gloves', 'Thermal Wear', 'Scarf');
    }
  }

  // Condition-based recommendations
  if (weatherCondition === 'rain') {
    packingList.push('Umbrella', 'Raincoat', 'Waterproof Shoes');
  } else if (weatherCondition === 'snow') {
    packingList.push('Winter Boots', 'Snow Gloves', 'Thermal Socks');
  }

  // Activity-based recommendations
  if (activities.includes('beach')) {
    packingList.push('Swimsuit', 'Flip-flops', 'Beach Towel', 'Snorkel Gear');
  }
  if (activities.includes('hiking')) {
    packingList.push('Hiking Boots', 'Water Bottle', 'Trail Snacks', 'First Aid Kit');
  }
  if (activities.includes('city_tour')) {
    packingList.push('Comfortable Shoes', 'Camera', 'Portable Charger');
  }

  res.json({ packingList });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
