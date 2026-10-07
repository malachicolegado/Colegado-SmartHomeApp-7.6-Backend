import type MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export type Device = {
  id: number;
  name: string;
  type: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  status: boolean;
};

export type SensorData = {
  id: number;
  temperature: number;
  humidity: number;
  deviceId: string;
  recordedAt: string;
};
