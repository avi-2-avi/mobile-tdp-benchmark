import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useSharedValue, withTiming, useAnimatedProps } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const generateCircles = (count) => {
  const circles = [];
  for (let i = 0; i < count; i++) {
    circles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      dx: Math.random() * 4 - 2,
      dy: Math.random() * 4 - 2,
      radius: 16,
    });
  }
  return circles;
};

const MovingCircles = ({ circleCount }) => {
  const [circles, setCircles] = useState(generateCircles(circleCount));

  useEffect(() => {
    setCircles(generateCircles(circleCount));
  }, [circleCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCircles((prevCircles) =>
        prevCircles.map((circle) => {
          let newX = circle.x + circle.dx;
          let newY = circle.y + circle.dy;
          if (newX < 0 || newX > width) circle.dx = -circle.dx;
          if (newY < 0 || newY > height) circle.dy = -circle.dy;
          return {
            ...circle,
            x: newX,
            y: newY,
          };
        })
      );
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <Svg height={height} width={width}>
      {circles.map((circle, index) => (
        <Circle
          key={index}
          cx={circle.x}
          cy={circle.y}
          r={circle.radius}
          fill="red"
        />
      ))}
    </Svg>
  );
};

const FpsAndResourceMonitor = () => {
  const [fps, setFps] = useState(0);
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);

  useEffect(() => {
    let frameCount = 0;
    let lastFrameTime = performance.now();
    const updateFps = () => {
      const now = performance.now();
      frameCount++;
      if (now - lastFrameTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastFrameTime = now;

        // Update CPU and memory usage
        setCpuUsage(Math.random()); // Placeholder for actual CPU usage
        setMemoryUsage(Math.random() * 100); // Placeholder for actual memory usage
      }
      requestAnimationFrame(updateFps);
    };
    requestAnimationFrame(updateFps);
  }, []);

  return (
    <View style={styles.monitor}>
      <Text style={styles.monitorText}>FPS: {fps}</Text>
      <Text style={styles.monitorText}>
        CPU Usage: {(cpuUsage * 100).toFixed(2)}%
      </Text>
      <Text style={styles.monitorText}>
        Memory Usage: {memoryUsage.toFixed(2)} MB
      </Text>
    </View>
  );
};

const App = () => {
  const [circleCount, setCircleCount] = useState(0);
  const [inputValue, setInputValue] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={(text) => {
          setInputValue(text);
          const count = parseInt(text, 10);
          if (!isNaN(count)) {
            setCircleCount(count);
          }
        }}
        keyboardType="numeric"
        placeholder="Enter number of circles"
      />
      <View style={styles.canvas}>
        <MovingCircles circleCount={circleCount} />
      </View>
      <FpsAndResourceMonitor />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    padding: 8,
    marginBottom: 16,
  },
  canvas: {
    flex: 1,
    width: '100%',
  },
  monitor: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
    alignItems: 'center',
    width: '100%',
  },
  monitorText: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 4,
  },
});

export default App;
