import 'package:flutter/material.dart';

import 'dart:async';
import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Moving Circles with FPS Monitor',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> with SingleTickerProviderStateMixin {
  List<Circle> circles = [];
  int circleCount = 0;
  TextEditingController _controller = TextEditingController();
  late Ticker _ticker;
  int _fps = 0;
  int _frameCount = 0;
  int _lastFrameTime = DateTime.now().millisecondsSinceEpoch;

  @override
  void initState() {
    super.initState();
    _ticker = createTicker((Duration elapsed) {
      setState(() {
        _updateCircles();
        _calculateFps();
      });
    });
    _ticker.start();
  }

  @override
  void dispose() {
    _ticker.dispose();
    super.dispose();
  }

  void _updateCircles() {
    for (var circle in circles) {
      circle.updatePosition();
    }
  }

  void _calculateFps() {
    _frameCount++;
    int currentTime = DateTime.now().millisecondsSinceEpoch;
    if (currentTime - _lastFrameTime >= 1000) {
      _fps = _frameCount;
      _frameCount = 0;
      _lastFrameTime = currentTime;
    }
  }

  void _generateCircles(int count) {
    circles.clear();
    Random random = Random();
    for (int i = 0; i < count; i++) {
      circles.add(Circle(
        x: random.nextDouble() * 300,
        y: random.nextDouble() * 600,
        dx: random.nextDouble() * 4 - 2,
        dy: random.nextDouble() * 4 - 2,
      ));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Moving Circles with FPS Monitor'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: <Widget>[
            TextField(
              controller: _controller,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(
                labelText: 'Enter number of circles',
                border: OutlineInputBorder(),
              ),
              onSubmitted: (value) {
                setState(() {
                  circleCount = int.tryParse(value) ?? 0;
                  _generateCircles(circleCount);
                });
              },
            ),
            SizedBox(height: 20),
            Expanded(
              child: Stack(
                children: <Widget>[
                  ...circles.map((circle) => Positioned(
                    left: circle.x,
                    top: circle.y,
                    child: CircleAvatar(
                      radius: circle.radius,
                      backgroundColor: Colors.red,
                    ),
                  )),
                  Positioned(
                    top: 10,
                    left: 10,
                    child: Text(
                      'FPS: $_fps',
                      style: TextStyle(color: Colors.black, fontSize: 24),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class Circle {
  double x;
  double y;
  double dx;
  double dy;
  double radius;

  Circle({required this.x, required this.y, required this.dx, required this.dy, this.radius = 16});

  void updatePosition() {
    x += dx;
    y += dy;

    if (x < 0 || x > 300) dx = -dx;
    if (y < 0 || y > 600) dy = -dy;
  }
}

