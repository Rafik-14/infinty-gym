/**
 * Quick Performance Test for Infinity Gym Website
 * 
 * This script runs a simplified performance test with fewer users and shorter durations
 * for quick local testing.
 */

const { runPerformanceTest, CONFIG } = require('./load-test.js');

// Override config for quick testing
CONFIG.MAX_CONCURRENT_USERS = 2;
CONFIG.RAMP_UP_DURATION = 10 * 1000; // 10 seconds
CONFIG.SUSTAINED_DURATION = 20 * 1000; // 20 seconds
CONFIG.THINK_TIME_MIN = 500; // 0.5 seconds
CONFIG.THINK_TIME_MAX = 1000; // 1 second

console.log('Starting Quick Performance Test...');
console.log(`Configuration: Up to ${CONFIG.MAX_CONCURRENT_USERS} virtual users`);
console.log(`Ramp-up: ${CONFIG.RAMP_UP_DURATION / 1000} seconds`);
console.log(`Sustained load: ${CONFIG.SUSTAINED_DURATION / 1000} seconds`);

// Run the performance test
runPerformanceTest()
  .then(() => {
    console.log('Quick performance test completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Quick performance test failed:', error);
    process.exit(1);
  });