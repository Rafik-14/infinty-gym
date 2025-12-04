/**
 * Manages the gym's members and memberships
 * @class
 */
class GymManager {
    /**
     * Create a gym manager
     */
    constructor() {
        this.members = [];
        this.memberships = [];
    }

    /**
     * Add a new member to the gym
     * @param {Member} member - The member to add
     * @returns {void}
     */
    addMember(member) {
        this.members.push(member);
    }

    /**
     * Remove a member from the gym
     * @param {string} memberId - The ID of the member to remove
     * @returns {boolean} Whether the member was successfully removed
     */
    removeMember(memberId) {
        const index = this.members.findIndex(member => member.id === memberId);
        if (index > -1) {
            this.members.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * Find a member by ID
     * @param {string} memberId - The ID of the member to find
     * @returns {Member|null} The member object or null if not found
     */
    findMemberById(memberId) {
        return this.members.find(member => member.id === memberId) || null;
    }

    /**
     * Add a new membership plan
     * @param {Membership} membership - The membership plan to add
     * @returns {void}
     */
    addMembership(membership) {
        this.memberships.push(membership);
    }

    /**
     * Get all active members
     * @returns {Array<Member>} Array of active members
     */
    getActiveMembers() {
        return this.members.filter(member => member.isActive);
    }

    /**
     * Get membership plan by type
     * @param {string} type - The membership type to find
     * @returns {Membership|null} The membership object or null if not found
     */
    getMembershipByType(type) {
        return this.memberships.find(membership => membership.type === type) || null;
    }

    /**
     * Get statistics about the gym
     * @returns {Object} Gym statistics
     */
    getStatistics() {
        return {
            totalMembers: this.members.length,
            activeMembers: this.getActiveMembers().length,
            membershipPlans: this.memberships.length
        };
    }

    /**
     * Export all data as an object
     * @returns {Object} All gym data
     */
    toObject() {
        return {
            members: this.members.map(member => member.toObject()),
            memberships: this.memberships.map(membership => membership.toObject()),
            statistics: this.getStatistics()
        };
    }
}

// Make the class available for both browser and Node.js
if (typeof window !== 'undefined') {
    window.GymManager = GymManager;
} else if (typeof module !== 'undefined' && module.exports) {
    // Use ES6 export for better compatibility
    module.exports = GymManager;
    exports.default = GymManager;
}