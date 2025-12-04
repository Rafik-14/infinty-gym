/**
 * Unit tests for the Membership class using Mocha and Chai
 */

// Set up jsdom for DOM manipulation in Node.js environment
require('jsdom-global')();

// Import chai for assertions
const { expect } = require('chai');

// Import fs for reading JavaScript file
const fs = require('fs');
const path = require('path');

// Read the JavaScript file
const membershipJs = fs.readFileSync(path.resolve(__dirname, './Membership.js'), 'utf8');

// Create a function to evaluate the class in the global context
function getMembershipClass() {
  // Execute the JavaScript in the global context
  eval(membershipJs);
  
  // Return the class from the global context
  return global.Membership || window.Membership;
}

describe('Membership', function() {
  let Membership;
  let membership;

  before(function() {
    Membership = getMembershipClass();
  });

  beforeEach(function() {
    membership = new Membership('Premium', 3500, ['Feature 1', 'Feature 2']);
  });

  describe('constructor', function() {
    it('should create a membership with correct properties', function() {
      expect(membership.type).to.equal('Premium');
      expect(membership.monthlyFee).to.equal(3500);
      expect(membership.features).to.deep.equal(['Feature 1', 'Feature 2']);
      expect(membership.restrictions).to.deep.equal({});
      expect(membership.isActive).to.be.true;
    });
  });

  describe('getFormattedFee', function() {
    it('should return the formatted monthly fee', function() {
      expect(membership.getFormattedFee()).to.equal('3500DA/month');
    });
  });

  describe('hasFeature', function() {
    it('should return true for existing features', function() {
      expect(membership.hasFeature('Feature 1')).to.be.true;
    });

    it('should return false for non-existing features', function() {
      expect(membership.hasFeature('Feature 3')).to.be.false;
    });
  });

  describe('addFeature', function() {
    it('should add a new feature', function() {
      membership.addFeature('Feature 3');
      expect(membership.features).to.include('Feature 3');
    });

    it('should not add duplicate features', function() {
      const initialLength = membership.features.length;
      membership.addFeature('Feature 1'); // Already exists
      expect(membership.features.length).to.equal(initialLength);
    });
  });

  describe('removeFeature', function() {
    it('should remove an existing feature', function() {
      membership.removeFeature('Feature 1');
      expect(membership.features).to.not.include('Feature 1');
    });

    it('should not change features when removing non-existing feature', function() {
      const initialFeatures = [...membership.features];
      membership.removeFeature('Feature 3'); // Doesn't exist
      expect(membership.features).to.deep.equal(initialFeatures);
    });
  });

  describe('calculateTotalCost', function() {
    it('should calculate the total cost for given months', function() {
      expect(membership.calculateTotalCost(3)).to.equal(10500); // 3500 * 3
    });
  });

  describe('toObject', function() {
    it('should return an object with all membership properties', function() {
      const membershipObj = membership.toObject();
      expect(membershipObj).to.be.an('object');
      expect(membershipObj.type).to.equal('Premium');
      expect(membershipObj.monthlyFee).to.equal(3500);
      expect(membershipObj.features).to.deep.equal(['Feature 1', 'Feature 2']);
      expect(membershipObj.restrictions).to.deep.equal({});
      expect(membershipObj.isActive).to.be.true;
    });
  });
});