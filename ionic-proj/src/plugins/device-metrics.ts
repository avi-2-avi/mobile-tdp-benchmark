import { registerPlugin } from '@capacitor/core';

export interface DeviceMetricsPlugin {
  getMetrics(): Promise<{ fps: number; cpuUsage: number; memoryUsage: number }>;
}

const DeviceMetrics = registerPlugin<DeviceMetricsPlugin>('DeviceMetrics');

export { DeviceMetrics };
