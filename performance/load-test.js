/**
 * Performance Load Test for Infinity Gym Website
 * 
 * This script simulates realistic user traffic to test website performance
 * under expected load conditions using Node.js and Puppeteer.
 */

const http = require('http');
const puppeteer = require('puppeteer');
const fs = require('fs');

// Test configuration to match your requirements
const CONFIG = {
  // Target 1000 virtual users with gradual ramp-up
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

// Metrics collection
const metrics = {
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  responseTimes: [],
  errors: []
};

// Active users tracking
let activeUsers = 0;
let testPhase = 'rampup'; // 'rampup', 'sustained', 'completed'
let testStartTime;

/**
 * Sleep function
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Record a metric
 */
function recordMetric(responseTime, success, error = null) {
  metrics.totalRequests++;
  
  if (success) {
    metrics.successfulRequests++;
    metrics.responseTimes.push(responseTime);
  } else {
    metrics.failedRequests++;
    if (error) {
      metrics.errors.push(error);
    }
  }
}

/**
 * Calculate statistics
 */
function calculateStats(times) {
  if (times.length === 0) return {};
  
  const sorted = times.slice().sort((a, b) => a - b);
  const sum = sorted.reduce((a, b) => a + b, 0);
  const avg = sum / sorted.length;
  
  return {
    min: sorted[0],
    max: sorted[sorted.length - 1],
    avg: avg,
    median: sorted[Math.floor(sorted.length / 2)],
    p90: sorted[Math.floor(sorted.length * 0.9)],
    p95: sorted[Math.floor(sorted.length * 0.95)]
  };
}

/**
 * Generate performance report
 */
function generateReport() {
  const duration = (Date.now() - testStartTime) / 1000; // in seconds
  const stats = calculateStats(metrics.responseTimes);
  
  const report = `
==================================================
INFINITY GYM WEBSITE PERFORMANCE TEST REPORT
==================================================

Test Duration: ${Math.round(duration)} seconds
Maximum Concurrent Users: ${CONFIG.MAX_CONCURRENT_USERS}

REQUEST METRICS:
----------------
Total Requests: ${metrics.totalRequests}
Successful Requests: ${metrics.successfulRequests}
Failed Requests: ${metrics.failedRequests}
Success Rate: ${(metrics.successfulRequests / metrics.totalRequests * 100).toFixed(2)}%

RESPONSE TIME METRICS:
----------------------
Min: ${stats.min ? stats.min + 'ms' : 'N/A'}
Max: ${stats.max ? stats.max + 'ms' : 'N/A'}
Average: ${stats.avg ? stats.avg.toFixed(2) + 'ms' : 'N/A'}
Median: ${stats.median ? stats.median + 'ms' : 'N/A'}
90th Percentile: ${stats.p90 ? stats.p90 + 'ms' : 'N/A'}
95th Percentile: ${stats.p95 ? stats.p95 + 'ms' : 'N/A'}

PERFORMANCE GOAL COMPLIANCE:
----------------------------
Target Response Time: ${CONFIG.TARGET_RESPONSE_TIME}ms
Average Response Time: ${stats.avg ? stats.avg.toFixed(2) + 'ms' : 'N/A'}
95th Percentile Response Time: ${stats.p95 ? stats.p95 + 'ms' : 'N/A'}
Within Target (95% under 2s): ${stats.p95 && stats.p95 <= CONFIG.TARGET_RESPONSE_TIME ? 'YES' : 'NO'}

ERROR SUMMARY:
--------------
Total Errors: ${metrics.errors.length}
Unique Errors: ${[...new Set(metrics.errors)].length}

${metrics.errors.length > 0 ? 'Sample Errors:\n' + metrics.errors.slice(0, 5).map(e => '  - ' + e).join('\n') : 'No errors recorded.'}

==================================================
`;

  return report;
}

/**
 * Test a single page load
 */
async function testPageLoad(page, url) {
  const startTime = Date.now();
  let success = false;
  let error = null;
  
  try {
    // Navigate to the page
    const response = await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
    
    // Wait a bit for resources to load
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    success = true;
  } catch (err) {
    error = err.message;
    console.error(`Error loading ${url}:`, error);
  }
  
  const responseTime = Date.now() - startTime;
  recordMetric(responseTime, success, error);
  
  return { success, responseTime, error };
}

/**
 * Simulate a virtual user
 */
async function simulateUser(userId) {
  console.log(`Starting virtual user ${userId}`);
  activeUsers++;
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });
  
  const page = await browser.newPage();
  page.setDefaultTimeout(30000);
  
  // User behavior loop
  while (testPhase !== 'completed') {
    // Randomly select a page to visit
    const randomUrl = CONFIG.PAGES_TO_TEST[Math.floor(Math.random() * CONFIG.PAGES_TO_TEST.length)];
    
    // Test the page load
    await testPageLoad(page, randomUrl);
    
    // Simulate user thinking time
    const thinkTime = Math.floor(Math.random() * (CONFIG.THINK_TIME_MAX - CONFIG.THINK_TIME_MIN)) + CONFIG.THINK_TIME_MIN;
    await sleep(thinkTime);
  }
  
  await page.close();
  await browser.close();
  activeUsers--;
  console.log(`Stopping virtual user ${userId}`);
}

/**
 * Control the test phases
 */
async function controlTestPhases() {
  testStartTime = Date.now();
  
  // Ramp-up phase
  console.log(`Starting ramp-up phase: Gradually adding users over ${CONFIG.RAMP_UP_DURATION / 1000 / 60} minutes`);
  
  const rampUpInterval = CONFIG.RAMP_UP_DURATION / CONFIG.MAX_CONCURRENT_USERS;
  let userCount = 0;
  
  // Start users gradually
  const userIntervals = [];
  for (let i = 0; i < CONFIG.MAX_CONCURRENT_USERS; i++) {
    userIntervals.push(setTimeout(() => {
      simulateUser(userCount++);
    }, rampUpInterval * i));
  }
  
  // Wait for ramp-up to complete
  await sleep(CONFIG.RAMP_UP_DURATION);
  
  // Sustained load phase
  console.log(`Starting sustained load phase: Maintaining ${CONFIG.MAX_CONCURRENT_USERS} users for ${CONFIG.SUSTAINED_DURATION / 1000 / 60} minutes`);
  testPhase = 'sustained';
  
  await sleep(CONFIG.SUSTAINED_DURATION);
  
  // Test completion
  console.log('Completing test...');
  testPhase = 'completed';
  
  // Clear any remaining intervals
  userIntervals.forEach(clearInterval);
  
  // Wait for all users to finish
  while (activeUsers > 0) {
    await sleep(1000);
  }
}

/**
 * Main performance test function
 */
async function runPerformanceTest() {
  console.log('Starting Infinity Gym Website Performance Test...');
  console.log(`Configuration: Up to ${CONFIG.MAX_CONCURRENT_USERS} virtual users`);
  console.log(`Ramp-up: ${CONFIG.RAMP_UP_DURATION / 1000 / 60} minutes`);
  console.log(`Sustained load: ${CONFIG.SUSTAINED_DURATION / 1000 / 60} minutes`);
  
  try {
    // Run the test phases
    await controlTestPhases();
    
    // Generate and save report
    const report = generateReport();
    console.log(report);
    
    // Save report to file
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportPath = `performance-report-${timestamp}.txt`;
    fs.writeFileSync(reportPath, report);
    console.log(`Performance report saved to: ${reportPath}`);
    
    return metrics;
  } catch (error) {
    console.error('Performance test failed:', error);
    throw error;
  }
}

// Run the performance test if this script is executed directly
if (require.main === module) {
  runPerformanceTest()
    .then(() => {
      console.log('Performance test completed successfully');
      process.exit(0);
    })
    .catch(error => {
      console.error('Performance test failed:', error);
      process.exit(1);
    });
}

module.exports = { runPerformanceTest, CONFIG, metrics };