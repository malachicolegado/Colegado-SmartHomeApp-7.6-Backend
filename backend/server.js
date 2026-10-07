const express = require('express');
const cors = require('cors');
const db = require('./db');
const deviceRoutes = require('./routes/devices');
const sensorRoutes = require('./routes/sensorReadings');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({ status: 'ok' });
  } catch (error) {
    res.status(500).json({ message: 'Cannot connect to the database.' });
  }
});

app.use('/api/devices', deviceRoutes);
app.use('/api/sensor-readings', sensorRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
