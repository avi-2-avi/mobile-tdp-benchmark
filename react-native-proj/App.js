import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

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

const MovingCircles = ({ circleCount, onRender }) => {
  const [circles, setCircles] = useState(generateCircles(circleCount));

  useEffect(() => {
    setCircles(generateCircles(circleCount));
    onRender && onRender(); // Call the onRender callback when the circles are set
  }, [circleCount, onRender]);

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

const FpsAndResourceMonitor = ({ responseTime }) => {
  const [fps, setFps] = useState(0);

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
      }
      requestAnimationFrame(updateFps);
    };
    requestAnimationFrame(updateFps);
  }, []);

  return (
    <View style={styles.monitor}>
      <Text style={styles.monitorText}>FPS: {fps}</Text>
      <Text style={styles.monitorText}>
        Initial Response Time: {responseTime !== null ? `${responseTime}ms` : 'N/A'}
      </Text>
    </View>
  );
};

const App = () => {
  const [circleCount, setCircleCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [responseTime, setResponseTime] = useState(null);
  const startTimeRef = useRef(null);

  const handleInputChange = (text) => {
    setInputValue(text);
    const count = parseInt(text, 10);
    if (!isNaN(count)) {
      startTimeRef.current = performance.now();
      setCircleCount(count);
    }
  };

  const handleRender = () => {
    if (startTimeRef.current !== null) {
      const endTime = performance.now();
      const initialResponseTime = endTime - startTimeRef.current;
      setResponseTime(initialResponseTime.toFixed(2));
      startTimeRef.current = null; // Reset the start time
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={handleInputChange}
        keyboardType="numeric"
        placeholder="Enter number of circles"
      />
      <View style={styles.canvas}>
        <MovingCircles circleCount={circleCount} onRender={handleRender} />
      </View>
      <FpsAndResourceMonitor responseTime={responseTime} />
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
