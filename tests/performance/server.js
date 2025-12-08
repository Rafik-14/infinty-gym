/**
 * Simple HTTP server to serve static files for performance testing
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Port for the local server
const PORT = 3002;

// MIME types for static files
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Create the HTTP server
const server = http.createServer((req, res) => {
  // Parse the request URL
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;
  
  // Default to index.html for root path
  if (pathname === '/') {
    pathname = '/index.html';
  }
  
  // Construct the file path
  let filePath = path.join(process.cwd(), pathname);
  
  // For HTML files, check if they exist in the html directory
  if (pathname.endsWith('.html') || pathname === '/index.html') {
    const htmlFilePath = path.join(process.cwd(), 'html', pathname === '/' ? 'index.html' : pathname.substring(1));
    if (fs.existsSync(htmlFilePath)) {
      filePath = htmlFilePath;
    }
  }

  // Security check to prevent directory traversal
  if (!filePath.startsWith(process.cwd())) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }
  
  // Get file extension
  const extname = path.extname(filePath).toLowerCase();
  
  // Set content type based on file extension
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';
  
  // Read and serve the file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      } else {
        // Server error
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      }
    } else {
      // Success - serve the file
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Static file server running at http://localhost:${PORT}/`);
  console.log('Press Ctrl+C to stop the server');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});