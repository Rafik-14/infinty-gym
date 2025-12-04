/**
 * Integration tests for the Infinity Gym website using Mocha and Chai
 * Tests the interaction between HTML elements and JavaScript functionality
 */

// Set up jsdom for DOM manipulation in Node.js environment
require('jsdom-global')();

// Import chai for assertions
const { expect } = require('chai');

// Import fs for reading HTML and JavaScript files
const fs = require('fs');
const path = require('path');

// Read the HTML file
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

// Read the JavaScript files
const memberJs = fs.readFileSync(path.resolve(__dirname, './Member.js'), 'utf8');
const membershipJs = fs.readFileSync(path.resolve(__dirname, './Membership.js'), 'utf8');
const gymManagerJs = fs.readFileSync(path.resolve(__dirname, './GymManager.js'), 'utf8');
const browserExampleJs = fs.readFileSync(path.resolve(__dirname, './browser-example.js'), 'utf8');

describe('Infinity Gym Website Integration', function() {
  before(function() {
    // Set up the DOM with our HTML
    document.documentElement.innerHTML = html;
    
    // Set up window object to simulate browser environment
    global.window = global;
    
    // Execute the JavaScript in the global context
    eval(memberJs);
    eval(membershipJs);
    eval(gymManagerJs);
    eval(browserExampleJs);
    
    // Explicitly expose functions to global scope
    global.initializeGymSystem = global.window.initializeGymSystem;
    global.showGymStatistics = global.window.showGymStatistics;
  });

  describe('HTML Structure', function() {
    it('should have the main navigation menu', function() {
      const navbar = document.querySelector('.navbar');
      expect(navbar).to.exist;
      
      const navLinks = document.querySelectorAll('.nav-link');
      expect(navLinks.length).to.be.at.least(3);
    });

    it('should have the hero section with correct content', function() {
      const heroSection = document.querySelector('.hero-section');
      expect(heroSection).to.exist;
      
      const heroTitle = document.querySelector('.hero-title');
      expect(heroTitle).to.exist;
      expect(heroTitle.textContent).to.contain('Rise Together');
    });

    it('should have three membership plans displayed', function() {
      const pricingCards = document.querySelectorAll('.pricing-card');
      expect(pricingCards.length).to.equal(3);
      
      const planNames = Array.from(pricingCards).map(card => 
        card.querySelector('.plan-name').textContent
      );
      expect(planNames).to.include('BASIC');
      expect(planNames).to.include('STANDARD');
      expect(planNames).to.include('PREMIUM');
    });
  });

  describe('JavaScript Functionality', function() {
    it('should create Member, Membership, and GymManager classes correctly', function() {
      // Test that the classes are available in the global context
      expect(global.Member).to.be.a('function');
      expect(global.Membership).to.be.a('function');
      expect(global.GymManager).to.be.a('function');
    });

    it('should create instances of classes without errors', function() {
      // Test creating a Member instance
      const member = new global.Member(
        'M001',
        'John',
        'Doe',
        'john@example.com',
        '+1234567890',
        new Date('2023-01-15'),
        'Premium'
      );
      expect(member).to.be.an.instanceof(global.Member);
      expect(member.id).to.equal('M001');
      expect(member.firstName).to.equal('John');
      expect(member.lastName).to.equal('Doe');

      // Test creating a Membership instance
      const membership = new global.Membership('Premium', 3500, ['Feature 1', 'Feature 2']);
      expect(membership).to.be.an.instanceof(global.Membership);
      expect(membership.type).to.equal('Premium');
      expect(membership.monthlyFee).to.equal(3500);

      // Test creating a GymManager instance
      const gymManager = new global.GymManager();
      expect(gymManager).to.be.an.instanceof(global.GymManager);
      expect(gymManager.members).to.be.an('array');
      expect(gymManager.memberships).to.be.an('array');
    });

    it('should allow adding members and memberships to GymManager', function() {
      const gymManager = new global.GymManager();
      
      // Add a membership
      const membership = new global.Membership('Basic', 2000, ['Feature 1']);
      gymManager.addMembership(membership);
      expect(gymManager.memberships).to.have.lengthOf(1);
      expect(gymManager.memberships[0]).to.equal(membership);
      
      // Add a member
      const member = new global.Member(
        'M002',
        'Jane',
        'Smith',
        'jane@example.com',
        '+1987654321',
        new Date('2023-02-20'),
        'Basic'
      );
      gymManager.addMember(member);
      expect(gymManager.members).to.have.lengthOf(1);
      expect(gymManager.members[0]).to.equal(member);
    });
  });

  describe('End-to-End Workflow', function() {
    it('should initialize the gym system correctly', function() {
      // Initialize the gym system
      global.initializeGymSystem();
      
      // Check that the gym instance was created
      expect(global.window.gym).to.be.an.instanceof(global.GymManager);
      expect(global.window.gym.members).to.have.lengthOf(3);
      expect(global.window.gym.memberships).to.have.lengthOf(3);
    });

    it('should display gym statistics correctly', function() {
      // Create a div to capture output
      const outputDiv = document.createElement('div');
      outputDiv.id = 'gymOutput';
      document.body.appendChild(outputDiv);
      
      // Get initial output content
      const initialContent = outputDiv.innerHTML;
      
      // Show gym statistics
      global.showGymStatistics();
      
      // Check that output was updated
      const updatedContent = outputDiv.innerHTML;
      expect(updatedContent).to.not.equal(initialContent);
      expect(updatedContent).to.contain('Gym Statistics');
      expect(updatedContent).to.contain('Total Members');
      expect(updatedContent).to.contain('Active Members');
      expect(updatedContent).to.contain('Membership Plans');
    });
  });
});