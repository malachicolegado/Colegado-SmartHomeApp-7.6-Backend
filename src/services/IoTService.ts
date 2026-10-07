import { sampleDevices, sampleSensorData, type Device, type SensorData } from '@/models/IoTModels';

const FAILURE_RATE = 0.2;

let deviceStore: Device[] = sampleDevices.map((device) => ({ ...device }));

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

function simulateFailure(message: string) {
  if (Math.random() < FAILURE_RATE) {
    throw new Error(message);
  }
}

function randomAround(value: number, spread: number) {
  return Math.round(value + (Math.random() * 2 - 1) * spread);
}

export async function connectGateway(): Promise<void> {
  await delay(1200);
  simulateFailure('Unable to reach the IoT Gateway.');
}

export async function getDevices(): Promise<Device[]> {
  await delay(1500);
  simulateFailure('Unable to load devices.');
  return deviceStore.map((device) => ({ ...device }));
}

export async function getSensorData(): Promise<SensorData> {
  await delay(1500);
  simulateFailure('Unable to retrieve sensor data.');
  return {
    temperature: randomAround(sampleSensorData.temperature, 3),
    humidity: randomAround(sampleSensorData.humidity, 10),
    lightLevel: randomAround(sampleSensorData.lightLevel, 200),
  };
}

export async function updateDeviceStatus(id: number, status: boolean): Promise<Device> {
  await delay(1000);
  const device = deviceStore.find((item) => item.id === id);
  if (!device) {
    throw new Error('Device not found.');
  }
  simulateFailure(`Unable to update ${device.name}.`);

  deviceStore = deviceStore.map((item) => (item.id === id ? { ...item, status } : item));
  return { ...device, status };
}
