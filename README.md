# Mobile Frameworks Benchmark - TDP

## Overview

This repository contains a comprehensive benchmark comparison of four popular mobile frameworks: Jetpack Compose, Flutter, React Native, and Ionic. The benchmark evaluates the performance of a standardized project implemented in each framework by measuring key performance indicators such as startup time, response time, and FPS (frames per second).

## Table of Contents

- [Overview](#overview)
- [Important Warning](#important-warning)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Benchmark Metrics](#benchmark-metrics)
  - [Startup Time](#startup-time)
  - [Response Time](#response-time)
  - [FPS (Frames Per Second)](#fps-frames-per-second)
- [Results](#results)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

The repository is organized as follows:

```
mobile-tdp-benchmark/
│
├── compose-proj/
│   └── (Jetpack Compose project files)
├── flutter-proj/
│   └── (Flutter project files)
├── react-native-proj/
│   └── (React Native project files)
├── ionic-proj/
│   └── (Ionic project files)
│
├── README.md
└── LICENSE
```

## Installation

To set up the projects and run the benchmarks, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/avi-2-avi/mobile-tdp-benchmark.git
   cd mobile-tdp-benchmark
   ```

2. Install dependencies for each project:

   ```bash
   cd jetpack-compose-proj
   ./gradlew build
   cd ../flutter-proj
   flutter pub get
   cd ../react-native-proj
   npm install
   cd ../ionic-proj
   npm install
   ```

## Usage

To run the benchmarks, navigate to each individual project and execute it. Make sure you have the appropriate tools and SDKs installed for each framework (e.g., Android Studio for Jetpack Compose, Flutter SDK for Flutter, Node.js for React Native and Ionic).

1. Navigate to the project directory, for example:

   ```bash
   cd jetpack-compose-proj
   ```

2. Run the benchmark:

   ```bash
   ./gradlew installDebug
   ```

   For Flutter:

   ```bash
   flutter run
   ```

   For React Native:

   ```bash
   npm run android
   ```

   For Ionic:

   ```bash
   ionic serve
   ```

This will execute the tests for each framework and collect data on startup time, response time, and FPS.

## Benchmark Metrics

The benchmark focuses on three main metrics to evaluate performance:

### Initial Response Time

Response time measures the time taken for the application to respond to user interactions, specifically to adding components. This metric is crucial for assessing the responsiveness of the application.

### FPS (Frames Per Second)

FPS measures the rendering performance during animations and user interactions. Higher FPS values indicate smoother performance.

## Results

Each framework's performance has been documented and compared, obtaining the following performance results, from most to least performant:

1. Flutter
2. Ionic
3. React Native
4. Jetpack Compose

## Contributing

Contributions are welcome! If you would like to improve the benchmarks or add new features, please fork the repository and create a pull request.

## License

This project is licensed under the GNU License. See the [LICENSE](./LICENSE) file for details.
