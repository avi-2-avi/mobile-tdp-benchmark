import { useDeviceMetrics } from "../hooks/useDeviceMetrics";

const FpsAndResourceMonitor: React.FC = () => {
    const { fps, cpuUsage, memoryUsage } = useDeviceMetrics();
  
    return (
        <div style={{ zIndex: "50" ,position: "fixed", top: "16px", right: "16px", background: "rgba(0, 0, 0, 0.5)", padding: "8px", color: "white", borderRadius: "4px" }}>
            <div>FPS: {fps}</div>
            <div>CPU Usage: {cpuUsage.toFixed(2)}%</div>
            <div>Memory Usage: {(memoryUsage / (1024 * 1024)).toFixed(2)} MB</div>
        </div>
    );
  };

export default FpsAndResourceMonitor;
