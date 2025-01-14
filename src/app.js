const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db.config');
const userRoutes = require('./routes/user.routes');
const truckRoutes = require('./routes/truck.routes');
const orderRoutes = require('./routes/order.routes');
const locationRoutes = require('./routes/location.routes');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a la base de datos
connectDB();

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/trucks', truckRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/locations', locationRoutes);

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});