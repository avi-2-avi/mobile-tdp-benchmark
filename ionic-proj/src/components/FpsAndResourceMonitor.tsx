import React, { useState, useEffect } from 'react';

const FpsAndResourceMonitor: React.FC = () => {
  const [fps, setFps] = useState(0);
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const update = () => {
      const now = performance.now();
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = now;

        // Dummy CPU and memory usage for example purposes
        setCpuUsage(Math.random() * 100);
        setMemoryUsage(Math.random() * 500);
      }
      requestAnimationFrame(update);
    };

    update();
  }, []);

  return (
    <div style={{ zIndex: "50" ,position: "fixed", top: "16px", right: "16px", background: "rgba(0, 0, 0, 0.5)", padding: "8px", color: "white", borderRadius: "4px" }}>
      <div>FPS: {fps}</div>
      <div>CPU Usage: {cpuUsage.toFixed(2)}%</div>
      <div>Memory Usage: {memoryUsage.toFixed(2)} MB</div>
    </div>
  );
};

export default FpsAndResourceMonitor;
