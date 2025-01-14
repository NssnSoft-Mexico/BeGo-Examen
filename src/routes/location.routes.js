// routes/locationRoutes.js
const express = require('express');
const axios = require('axios');
const Location = require('../models/location.model');
const User = require('../models/user.model');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

const getLocationFromPlaceId = async (placeId) => {

const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  
const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data.result;
    if (data) {
      const { formatted_address, geometry } = data;
      const { lat, lng } = geometry.location;

      return {
        address: formatted_address,
        place_id: placeId,
        latitude: lat,
        longitude: lng,
      };
    }
    throw new Error('No se encontró la ubicación.');
  } catch (error) {
    throw new Error('Error al obtener la ubicación de la API de Google Maps.');
  }
};

router.post('/', async (req, res) => {
  const { place_id, user } = req.body;

  try {
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(400).json({ message: 'Usuario no encontrado.' });
    }

    const existingLocation = await Location.findOne({ place_id });
    if (existingLocation) {
      return res.status(400).json({ message: 'La ubicación ya ha sido creada.' });
    }

    const locationData = await getLocationFromPlaceId(place_id);

    const newLocation = new Location({
      ...locationData,
      user,
    });

    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  const { user } = req.query;  // Filtro por usuario (opcional)

  try {
    const locations = await Location.find(user ? { user } : {}).populate('user', 'email');
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const location = await Location.findById(req.params.id).populate('user', 'email');
    if (!location) {
      return res.status(404).json({ message: 'Ubicación no encontrada.' });
    }
    res.json(location);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { address, place_id, latitude, longitude } = req.body;

  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Ubicación no encontrada.' });
    }

    location.address = address || location.address;
    location.place_id = place_id || location.place_id;
    location.latitude = latitude || location.latitude;
    location.longitude = longitude || location.longitude;

    await location.save();
    res.json(location);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Ubicación no encontrada.' });
    }

    await location.remove();
    res.json({ message: 'Ubicación eliminada correctamente.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;