/**
 * Unit tests for the GymManager class using Mocha and Chai
 */

// Set up jsdom for DOM manipulation in Node.js environment
require('jsdom-global')();

// Import chai for assertions
const { expect } = require('chai');

// Import fs for reading JavaScript files
const fs = require('fs');
const path = require('path');

// Read the JavaScript files
const memberJs = fs.readFileSync(path.resolve(__dirname, './Member.js'), 'utf8');
const membershipJs = fs.readFileSync(path.resolve(__dirname, './Membership.js'), 'utf8');
const gymManagerJs = fs.readFileSync(path.resolve(__dirname, './GymManager.js'), 'utf8');

// Create a function to evaluate the classes in the global context
function getClasses() {
  // Execute the JavaScript in the global context
  eval(memberJs);
  eval(membershipJs);
  eval(gymManagerJs);
  
  // Return the classes from the global context
  return {
    Member: global.Member || window.Member,
    Membership: global.Membership || window.Membership,
    GymManager: global.GymManager || window.GymManager
  };
}

describe('GymManager', function() {
  let Member, Membership, GymManager;
  let gymManager;

  before(function() {
    const classes = getClasses();
    Member = classes.Member;
    Membership = classes.Membership;
    GymManager = classes.GymManager;
  });

  beforeEach(function() {
    gymManager = new GymManager();
  });

  describe('constructor', function() {
    it('should initialize with empty members and memberships arrays', function() {
      expect(gymManager.members).to.be.an('array');
      expect(gymManager.members).to.have.lengthOf(0);
      expect(gymManager.memberships).to.be.an('array');
      expect(gymManager.memberships).to.have.lengthOf(0);
    });
  });

  describe('addMember', function() {
    it('should add a member to the members array', function() {
      const member = new Member('M001', 'John', 'Doe', 'john@example.com', '+1234567890', new Date(), 'Premium');
      gymManager.addMember(member);
      expect(gymManager.members).to.have.lengthOf(1);
      expect(gymManager.members[0]).to.equal(member);
    });
  });

  describe('addMembership', function() {
    it('should add a membership to the memberships array', function() {
      const membership = new Membership('Premium', 3500, ['Feature 1', 'Feature 2']);
      gymManager.addMembership(membership);
      expect(gymManager.memberships).to.have.lengthOf(1);
      expect(gymManager.memberships[0]).to.equal(membership);
    });
  });

  describe('findMemberById', function() {
    it('should return a member when found by ID', function() {
      const member = new Member('M001', 'John', 'Doe', 'john@example.com', '+1234567890', new Date(), 'Premium');
      gymManager.addMember(member);
      const foundMember = gymManager.findMemberById('M001');
      expect(foundMember).to.equal(member);
    });

    it('should return null when member is not found', function() {
      const foundMember = gymManager.findMemberById('M999');
      expect(foundMember).to.be.null;
    });
  });

  describe('getActiveMembers', function() {
    it('should return only active members', function() {
      const activeMember = new Member('M001', 'John', 'Doe', 'john@example.com', '+1234567890', new Date(), 'Premium');
      const inactiveMember = new Member('M002', 'Jane', 'Smith', 'jane@example.com', '+1234567891', new Date(), 'Standard');
      inactiveMember.cancelMembership();
      
      gymManager.addMember(activeMember);
      gymManager.addMember(inactiveMember);
      
      const activeMembers = gymManager.getActiveMembers();
      expect(activeMembers).to.have.lengthOf(1);
      expect(activeMembers[0]).to.equal(activeMember);
    });
  });

  describe('getStatistics', function() {
    it('should return correct statistics', function() {
      // Add some memberships
      const basicMembership = new Membership('Basic', 2000, ['Basic features']);
      const premiumMembership = new Membership('Premium', 3500, ['Premium features']);
      gymManager.addMembership(basicMembership);
      gymManager.addMembership(premiumMembership);
      
      // Add some members
      const member1 = new Member('M001', 'John', 'Doe', 'john@example.com', '+1234567890', new Date(), 'Premium');
      const member2 = new Member('M002', 'Jane', 'Smith', 'jane@example.com', '+1234567891', new Date(), 'Basic');
      const member3 = new Member('M003', 'Bob', 'Johnson', 'bob@example.com', '+1234567892', new Date(), 'Premium');
      member3.cancelMembership(); // Make this member inactive
      
      gymManager.addMember(member1);
      gymManager.addMember(member2);
      gymManager.addMember(member3);
      
      const stats = gymManager.getStatistics();
      expect(stats.totalMembers).to.equal(3);
      expect(stats.activeMembers).to.equal(2);
      expect(stats.membershipPlans).to.equal(2);
    });
  });
});