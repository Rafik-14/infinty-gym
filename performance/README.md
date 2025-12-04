# Infinity Gym Website Performance Tests

This directory contains performance and load tests for the Infinity Gym website using Puppeteer, a Node.js library for controlling headless Chrome browsers.

## Test Overview

The performance tests simulate realistic user traffic to ensure the website can handle expected load conditions:

- **Expected Normal Traffic**: 1000 concurrent users (configured for production, increased to 10 for more realistic local testing)
- **Ramp-up Period**: 15 minutes to reach peak load (configured as 1 minute for local testing)
- **Sustained Load**: 10 minutes at peak capacity (configured as 2 minutes for local testing)
- **Target Response Time**: < 2 seconds for 95% of requests

## Prerequisites

1. Node.js for running the local server and performance tests

2. Node.js for running the local server

## Test Configuration

The load test is configured to match your requirements:

- **Virtual Users**: Gradually ramps up to 10 users (reduced from 1000 for local testing)
- **Ramp-up Period**: 5 minutes (reduced from 15 minutes for local testing)
- **Sustained Load**: 2 minutes at peak capacity (reduced from 10 minutes for local testing)
- **Think Time**: 5-10 seconds between page visits
- **Target Pages**: 
  - Main website (index.html)
  - Admin panel (admin.html)
  - API documentation (api-documentation.html)

## Running Performance Tests

### 1. Start the Local Server

First, start the local HTTP server to serve the website files:

```bash
npm run start-server
```

This will start a server at `http://localhost:3000`.

### 2. Run the Load Test

In a separate terminal, run the full load test:

```bash
npm test
```

### 3. Run Smoke Test (for quick validation)

For a quick test to validate the setup:

```bash
npm run test:smoke
```

## Test Output

The performance test provides real-time metrics during the test and a detailed summary at the end:

```
==================================================
INFINITY GYM WEBSITE PERFORMANCE TEST REPORT
==================================================

Test Duration: 420 seconds
Maximum Concurrent Users: 10

REQUEST METRICS:
----------------
Total Requests: 150
Successful Requests: 142
Failed Requests: 8
Success Rate: 94.67%

RESPONSE TIME METRICS:
----------------------
Min: 120ms
Max: 1850ms
Average: 420.50ms
Median: 380ms
90th Percentile: 720ms
95th Percentile: 980ms

PERFORMANCE GOAL COMPLIANCE:
----------------------------
Target Response Time: 2000ms
Average Response Time: 420.50ms
95th Percentile Response Time: 980ms
Within Target (95% under 2s): YES

ERROR SUMMARY:
--------------
Total Errors: 8
Unique Errors: 2

Sample Errors:
  - Navigation timeout of 30000 ms exceeded
  - net::ERR_CONNECTION_REFUSED at http://localhost:3000/

==================================================
```

## Performance Goals

The test validates these performance criteria:

1. **Response Time**: 95% of requests should complete within 2 seconds
2. **Error Rate**: Less than 10% error rate
3. **Throughput**: Sufficient to handle concurrent users

## Customizing Tests

To modify test parameters, edit the `CONFIG` object in [load-test.js](file:///c:/Users/ksant/OneDrive/Bureau/final%20gymwebsite/infinity-gym-github/performance/load-test.js):

```javascript
const CONFIG = {
  MAX_CONCURRENT_USERS: 10,  // Increased for more realistic testing
  RAMP_UP_DURATION: 60 * 1000,  // 1 minute
  SUSTAINED_DURATION: 2 * 60 * 1000,  // 2 minutes
  THINK_TIME_MIN: 3000,  // 3 seconds
  THINK_TIME_MAX: 6000, // 6 seconds
  TARGET_RESPONSE_TIME: 2000, // 2 seconds
  PAGES_TO_TEST: [
    'http://localhost:3000/',
    'http://localhost:3000/admin.html',
    'http://localhost:3000/api-documentation.html'
  ]
};
```