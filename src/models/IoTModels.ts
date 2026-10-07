import type MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export type Device = {
  id: number;
  name: string;
  type: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  status: boolean;
};

export type SensorData = {
  temperature: number;
  humidity: number;
  lightLevel: number;
};

export const sampleDevices: Device[] = [
  { id: 1, name: 'Living Room Light', type: 'Smart Light', icon: 'lightbulb-on-outline', status: true },
  { id: 2, name: 'Bedroom Fan', type: 'Smart Fan', icon: 'fan', status: false },
  { id: 3, name: 'Front Door Lock', type: 'Smart Lock', icon: 'shield-lock-outline', status: true },
  { id: 4, name: 'Security Camera', type: 'Camera', icon: 'cctv', status: true },
  { id: 5, name: 'Air Conditioner', type: 'Climate', icon: 'air-conditioner', status: false },
];

export const sampleSensorData: SensorData = {
  temperature: 28,
  humidity: 65,
  lightLevel: 720,
};
