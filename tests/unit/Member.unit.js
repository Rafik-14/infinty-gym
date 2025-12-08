/**
 * Unit tests for the Member class using Mocha and Chai
 */

// Set up jsdom for DOM manipulation in Node.js environment
require('jsdom-global')();

// Import chai for assertions
const { expect } = require('chai');

// Import fs for reading JavaScript file
const fs = require('fs');
const path = require('path');

// Read the JavaScript file
const memberJs = fs.readFileSync(path.resolve(__dirname, '../../js/Member.js'), 'utf8');

// Create a function to evaluate the class in the global context
function getMemberClass() {
  // Execute the JavaScript in the global context
  eval(memberJs);
  
  // Return the class from the global context
  return global.Member || window.Member;
}

describe('Member', function() {
  let Member;
  let member;

  before(function() {
    Member = getMemberClass();
  });

  beforeEach(function() {
    member = new Member(
      'M001',
      'John',
      'Doe',
      'john.doe@example.com',
      '+1234567890',
      new Date('2023-01-15'),
      'Premium'
    );
  });

  describe('constructor', function() {
    it('should create a member with correct properties', function() {
      expect(member.id).to.equal('M001');
      expect(member.firstName).to.equal('John');
      expect(member.lastName).to.equal('Doe');
      expect(member.email).to.equal('john.doe@example.com');
      expect(member.phoneNumber).to.equal('+1234567890');
      expect(member.joinDate).to.deep.equal(new Date('2023-01-15'));
      expect(member.membershipType).to.equal('Premium');
      expect(member.isActive).to.be.true;
    });
  });

  describe('getFullName', function() {
    it('should return the correct full name', function() {
      expect(member.getFullName()).to.equal('John Doe');
    });
  });

  describe('getMembershipStatus', function() {
    it('should return Active when membership is active', function() {
      expect(member.getMembershipStatus()).to.equal('Active');
    });

    it('should return Inactive when membership is not active', function() {
      member.isActive = false;
      expect(member.getMembershipStatus()).to.equal('Inactive');
    });
  });

  describe('renewMembership', function() {
    it('should update membership type and set active status', function() {
      member.renewMembership('Standard');
      expect(member.membershipType).to.equal('Standard');
      expect(member.isActive).to.be.true;
    });
  });

  describe('cancelMembership', function() {
    it('should set membership to inactive', function() {
      member.cancelMembership();
      expect(member.isActive).to.be.false;
    });
  });

  describe('toObject', function() {
    it('should return an object with all member properties', function() {
      const memberObj = member.toObject();
      expect(memberObj).to.be.an('object');
      expect(memberObj.id).to.equal('M001');
      expect(memberObj.firstName).to.equal('John');
      expect(memberObj.lastName).to.equal('Doe');
      expect(memberObj.email).to.equal('john.doe@example.com');
      expect(memberObj.phoneNumber).to.equal('+1234567890');
      expect(memberObj.joinDate).to.deep.equal(new Date('2023-01-15'));
      expect(memberObj.membershipType).to.equal('Premium');
      expect(memberObj.isActive).to.be.true;
    });
  });
});