import React, { useState, useEffect, useRef } from 'react';

interface Circle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
}

const MovingCircles: React.FC<{ circleCount: number }> = ({ circleCount }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [circles, setCircles] = useState<Circle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const initializeCircles = () => {
      const newCircles = [];
      for (let i = 0; i < circleCount; i++) {
        newCircles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          dx: (Math.random() * 2 - 1) * 2,
          dy: (Math.random() * 2 - 1) * 2,
          radius: 16
        });
      }
      setCircles(newCircles);
    };

    initializeCircles();
  }, [circleCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      circles.forEach(circle => {
        circle.x += circle.dx;
        circle.y += circle.dy;

        if (circle.x < 0 || circle.x > canvas.width) circle.dx = -circle.dx;
        if (circle.y < 0 || circle.y > canvas.height) circle.dy = -circle.dy;

        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
      });
      requestAnimationFrame(update);
    };

    update();
  }, [circles]);

  return <canvas style={{width: "100%", height: "100%", background: "#f0f0f0"}} ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>;
};

export default MovingCircles;
