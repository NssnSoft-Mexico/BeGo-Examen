const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

router.post('/register', async (req, res) => {
    const {email, password} = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const newUser = new User({ email, password });
        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Buscar el usuario en la base de datos
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Usuario no encontrado.' });
      }
  
      // Comparar la contraseña proporcionada con la almacenada
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Contraseña incorrecta.' });
      }
  
      // Generar el token JWT
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Login exitoso', token });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});
  

router.get('/me', async (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }
  
      res.json({ email: user.email });
    } catch (err) {
      res.status(400).json({ message: 'Token inválido.' });
    }
});

module.exports = router;