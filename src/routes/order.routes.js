const express = require('express');
const Order = require('../models/order.model');
const Truck = require('../models/truck.model');
const User = require('../models/user.model');
const Location = require('../models/location.model');
const router = express.Router();

router.post('/', async (req, res) => {
    const { user, truck, pickup, dropoff } = req.body;
  
    try {
      // Verificar que el usuario, el truck y las ubicaciones existan
      const existingUser = await User.findById(user);
      const existingTruck = await Truck.findById(truck);
      const pickupLocation = await Location.findById(pickup);
      const dropoffLocation = await Location.findById(dropoff);
  
      if (!existingUser || !existingTruck || !pickupLocation || !dropoffLocation) {
        return res.status(400).json({ message: 'Usuario, Truck o Ubicaciones no encontrados.' });
      }
  
      // Crear la orden
      const order = new Order({
        user,
        truck,
        status: 'created', // El estado inicial de la orden es 'created'
        pickup,
        dropoff,
      });
  
      await order.save();
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
      const orders = await Order.find().populate('user', 'email').populate('truck', 'plates').populate('pickup', 'name address').populate('dropoff', 'name address');
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
      const order = await Order.findById(req.params.id).populate('user', 'email').populate('truck', 'plates').populate('pickup', 'name address').populate('dropoff', 'name address');
      if (!order) {
        return res.status(404).json({ message: 'Orden no encontrada.' });
      }
      res.json(order);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

router.put('/:id/status', async (req, res) => {
    const { status } = req.body;
  
    if (!['created', 'in transit', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Estado inválido.' });
    }
  
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Orden no encontrada.' });
      }
  
      order.status = status;
      await order.save();
      res.json(order);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Orden no encontrada.' });
      }
  
      await order.remove();
      res.json({ message: 'Orden eliminada correctamente.' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

module.exports = router;