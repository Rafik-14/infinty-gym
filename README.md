# Infinity Gym

A modern fitness center website built with HTML, CSS, and JavaScript.

## Project Overview

Infinity Gym is a responsive website for a fitness center that showcases membership plans, provides contact information, and offers subscription functionality. The site features smooth animations, a clean design, and mobile responsiveness.

## Documentation

- [User Guide](docs/USER_GUIDE.md) - Complete guide for end users of the website
- [Technical Documentation](docs/) - Developer documentation including class diagrams, data structures, and more
- [Tests Documentation](TESTS-README.md) - Comprehensive guide to the testing suite

## Quick Start

1. Clone the repository or download the ZIP file
2. Open `index.html` in your web browser

## Technologies Used

- HTML5
- CSS3 (with Flexbox and Grid)
- JavaScript (ES6+)
- Google Fonts (Poppins, Open Sans)
- Font Awesome icons

## Getting Started

### Prerequisites

- A modern web browser
- Node.js (for running tests)

### Installation

1. Clone the repository or download the ZIP file
2. Open `index.html` in your web browser

### Running Tests

This project includes comprehensive tests:

```bash
# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run end-to-end tests
npm run test:e2e

# Run performance tests
# First, start the server in one terminal:
npm run test:performance:start-server
# Then, run the performance test in another terminal:
npm run test:performance:run

# Run simple integration tests
npm test
```

### Test Summary

The project includes a comprehensive testing suite with four different types of tests that verify all website functionality:

- **Unit Tests**: 24 tests covering all core classes
- **Integration Tests**: 10 tests verifying component interactions
- **End-to-End Tests**: 12 tests simulating real user workflows
- **Performance Tests**: Load testing with detailed performance metrics

All tests are passing and provide complete coverage of the website's core functionality.

For detailed information about all tests, including how to run them and what they verify, see [TESTS-README.md](TESTS-README.md).

## Usage

Simply open `index.html` in any modern web browser to view the website. All functionality is self-contained and doesn't require a web server.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by modern fitness websites
- Icons provided by Font Awesome
- Fonts from Google Fonts