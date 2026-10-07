const express = require('express');
const db = require('../db');

const router = express.Router();

function toDevice(row) {
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    icon: row.icon,
    status: row.status === 1,
  };
}

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM devices ORDER BY id');
    res.json(rows.map(toDevice));
  } catch (error) {
    res.status(500).json({ message: 'Unable to load devices.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM devices WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Device not found.' });
    }
    res.json(toDevice(rows[0]));
  } catch (error) {
    res.status(500).json({ message: 'Unable to load device.' });
  }
});

router.put('/:id', async (req, res) => {
  const { status } = req.body;
  if (typeof status !== 'boolean') {
    return res.status(400).json({ message: 'Status must be true or false.' });
  }

  try {
    const [result] = await db.query('UPDATE devices SET status = ? WHERE id = ?', [
      status ? 1 : 0,
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Device not found.' });
    }
    const [rows] = await db.query('SELECT * FROM devices WHERE id = ?', [req.params.id]);
    res.json(toDevice(rows[0]));
  } catch (error) {
    res.status(500).json({ message: 'Unable to update device.' });
  }
});

module.exports = router;
