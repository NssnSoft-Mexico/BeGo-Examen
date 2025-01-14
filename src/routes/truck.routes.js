const express = require('express');
const Truck = require('../models/truck.model');
const User = require('../models/user.model');
const router = express.Router();


router.post('/', async (req, res) => {
    const { user, year, color, plates } = req.body;
  
    try {
      // Verificar que el usuario exista
      const existingUser = await User.findById(user);
      if (!existingUser) {
        return res.status(400).json({ message: 'Usuario no encontrado.' });
      }
  
      const truck = new Truck({ user, year, color, plates });
      await truck.save();
      res.status(201).json(truck);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
      const trucks = await Truck.find().populate('user', 'email');  // Obtener los datos del usuario junto con el truck
      res.json(trucks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
      const truck = await Truck.findById(req.params.id).populate('user', 'email');
      if (!truck) {
        return res.status(404).json({ message: 'Truck no encontrado.' });
      }
      res.json(truck);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const { year, color, plates } = req.body;
  
    try {
      const truck = await Truck.findById(req.params.id);
      if (!truck) {
        return res.status(404).json({ message: 'Truck no encontrado.' });
      }
  
      truck.year = year || truck.year;
      truck.color = color || truck.color;
      truck.plates = plates || truck.plates;
  
      await truck.save();
      res.json(truck);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
      const truck = await Truck.findById(req.params.id);
      if (!truck) {
        return res.status(404).json({ message: 'Truck no encontrado.' });
      }
  
      await truck.remove();
      res.json({ message: 'Truck eliminado correctamente.' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

module.exports = router;
