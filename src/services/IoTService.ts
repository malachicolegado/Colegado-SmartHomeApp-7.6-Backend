import Constants from 'expo-constants';

import type { Device, SensorData } from '@/models/IoTModels';

const host = Constants.expoConfig?.hostUri?.split(':')[0] ?? 'localhost';

export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? `http://${host}:3000/api`;

async function request<T>(path: string, fallback: string, options?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    throw new Error('Unable to reach the server.');
  }

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message ?? fallback);
  }
  return data as T;
}

export async function connectGateway(): Promise<void> {
  await request('/health', 'Unable to reach the IoT Gateway.');
}

export async function getDevices(): Promise<Device[]> {
  return request<Device[]>('/devices', 'Unable to load devices.');
}

export async function getSensorData(): Promise<SensorData> {
  return request<SensorData>('/sensor-readings/latest', 'Unable to retrieve sensor data.');
}

export async function updateDeviceStatus(id: number, status: boolean): Promise<Device> {
  return request<Device>(`/devices/${id}`, 'Unable to update device.', {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}
