CREATE DATABASE IF NOT EXISTS smarthome_iot;
USE smarthome_iot;

CREATE TABLE IF NOT EXISTS sensor_readings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  temperature DECIMAL(5,2) NOT NULL,
  humidity DECIMAL(5,2) NOT NULL,
  device_id VARCHAR(50) NOT NULL,
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS devices;

CREATE TABLE devices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  icon VARCHAR(50) NOT NULL,
  status TINYINT(1) NOT NULL DEFAULT 0
);

INSERT INTO devices (name, type, icon, status) VALUES
('Living Room Light', 'Smart Light', 'lightbulb-on-outline', 1),
('Bedroom Fan', 'Smart Fan', 'fan', 0),
('Front Door Lock', 'Smart Lock', 'shield-lock-outline', 1),
('Security Camera', 'Camera', 'cctv', 1),
('Air Conditioner', 'Climate', 'air-conditioner', 0);
