import React, { useState, useEffect } from 'react';

interface FpsAndResourceMonitorProps {
  initialLoadTime: number | string;
}

const FpsAndResourceMonitor: React.FC<FpsAndResourceMonitorProps> = ({ initialLoadTime }) => {
  const [fps, setFps] = useState(0);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let fpsInterval: NodeJS.Timeout;

    const update = () => {
      const now = performance.now();
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = now;
      }
      requestAnimationFrame(update);
    };

    update();

    return () => {
      clearInterval(fpsInterval);
    };
  }, []);

  return (
    <div style={{ zIndex: "50" ,position: "fixed", bottom: "20px", left: "50%", background: "rgba(0, 0, 0, 0.5)", padding: "8px", color: "white", borderRadius: "4px" }}>
      <div>FPS: {fps}</div>
      <div>Initial Load Time: {initialLoadTime}</div>
    </div>
  );
};

export default FpsAndResourceMonitor;
