/**
 * Simple test script to verify the performance test setup
 */

const http = require('http');

// Test if we can connect to the server
const req = http.get('http://localhost:3000', (res) => {
  console.log(`Server responded with status code: ${res.statusCode}`);
  
  if (res.statusCode === 200) {
    console.log('✅ Server connection successful');
    process.exit(0);
  } else {
    console.log('❌ Server connection failed');
    process.exit(1);
  }
});

req.on('error', (error) => {
  console.error('❌ Server connection failed:', error.message);
  process.exit(1);
});

// Timeout after 5 seconds
req.setTimeout(5000, () => {
  console.error('❌ Server connection timeout');
  req.destroy();
  process.exit(1);
});