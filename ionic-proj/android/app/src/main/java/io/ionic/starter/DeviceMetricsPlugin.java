package io.ionic.starter;

import android.os.Debug;
import android.os.Handler;
import android.os.Looper;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.PluginMethod;


@CapacitorPlugin(name = "DeviceMetrics")
public class DeviceMetricsPlugin extends Plugin {
    private int fps = 0;
    private int frameCount = 0;
    private long lastFrameTime = System.nanoTime();
    private Handler handler = new Handler(Looper.getMainLooper());

    @Override
    public void load() {
        super.load();
        startMonitoring();
    }

    private void startMonitoring() {
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                frameCount++;
                long currentTime = System.nanoTime();
                if (currentTime - lastFrameTime >= 1_000_000_000) {
                    fps = frameCount;
                    frameCount = 0;
                    lastFrameTime = currentTime;
                }
                handler.postDelayed(this, 16);
            }
        }, 16);
    }

    @PluginMethod
    public void getMetrics(PluginCall call) {
        float cpuUsage = Debug.threadCpuTimeNanos() / 1_000_000_000f;
        long memoryUsage = Debug.getNativeHeapAllocatedSize();

        JSObject ret = new JSObject();
        ret.put("fps", fps);
        ret.put("cpuUsage", cpuUsage);
        ret.put("memoryUsage", memoryUsage);
        call.resolve(ret);
    }
}
