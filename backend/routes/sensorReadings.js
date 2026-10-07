const express = require('express');
const db = require('../db');

const router = express.Router();

function toReading(row) {
  return {
    id: row.id,
    temperature: row.temperature,
    humidity: row.humidity,
    deviceId: row.device_id,
    recordedAt: row.recorded_at,
  };
}

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM sensor_readings ORDER BY id DESC LIMIT 50');
    res.json(rows.map(toReading));
  } catch (error) {
    res.status(500).json({ message: 'Unable to load sensor readings.' });
  }
});

router.get('/latest', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM sensor_readings ORDER BY id DESC LIMIT 1');
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No sensor readings yet.' });
    }
    res.json(toReading(rows[0]));
  } catch (error) {
    res.status(500).json({ message: 'Unable to retrieve sensor data.' });
  }
});

router.post('/', async (req, res) => {
  const { temperature, humidity, device_id } = req.body;
  if (typeof temperature !== 'number' || typeof humidity !== 'number' || !device_id) {
    return res.status(400).json({ message: 'temperature, humidity and device_id are required.' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO sensor_readings (temperature, humidity, device_id) VALUES (?, ?, ?)',
      [temperature, humidity, device_id]
    );
    const [rows] = await db.query('SELECT * FROM sensor_readings WHERE id = ?', [result.insertId]);
    res.status(201).json(toReading(rows[0]));
  } catch (error) {
    res.status(500).json({ message: 'Unable to save sensor reading.' });
  }
});

module.exports = router;
