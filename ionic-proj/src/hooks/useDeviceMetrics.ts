import { useState, useEffect } from 'react';
import { DeviceMetrics } from '../plugins/device-metrics';

export const useDeviceMetrics = () => {
  const [fps, setFps] = useState(0);
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const result = await DeviceMetrics.getMetrics();
        setFps(result.fps);
        setCpuUsage(result.cpuUsage);
        setMemoryUsage(result.memoryUsage);
      } catch (e) {
        console.error('Failed to get device metrics:', e);
      }
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return { fps, cpuUsage, memoryUsage };
};
