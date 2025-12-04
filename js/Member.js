/**
 * Represents a gym member
 * @class
 */
class Member {
    /**
     * Create a member
     * @param {string} id - The unique identifier for the member
     * @param {string} firstName - The member's first name
     * @param {string} lastName - The member's last name
     * @param {string} email - The member's email address
     * @param {string} phoneNumber - The member's phone number
     * @param {Date} joinDate - The date the member joined the gym
     * @param {string} membershipType - The type of membership (Basic, Standard, Premium)
     */
    constructor(id, firstName, lastName, email, phoneNumber, joinDate, membershipType) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.joinDate = joinDate;
        this.membershipType = membershipType;
        this.isActive = true;
    }

    /**
     * Get the member's full name
     * @returns {string} The member's full name
     */
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    /**
     * Get the member's membership status
     * @returns {string} The membership status
     */
    getMembershipStatus() {
        return this.isActive ? 'Active' : 'Inactive';
    }

    /**
     * Renew the member's membership
     * @param {string} newMembershipType - The new membership type
     * @returns {void}
     */
    renewMembership(newMembershipType) {
        this.membershipType = newMembershipType;
        this.isActive = true;
    }

    /**
     * Cancel the member's membership
     * @returns {void}
     */
    cancelMembership() {
        this.isActive = false;
    }

    /**
     * Get member information as an object
     * @returns {Object} The member's information
     */
    toObject() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phoneNumber: this.phoneNumber,
            joinDate: this.joinDate,
            membershipType: this.membershipType,
            isActive: this.isActive
        };
    }
}

// Make the class available for both browser and Node.js
if (typeof window !== 'undefined') {
    window.Member = Member;
} else if (typeof module !== 'undefined' && module.exports) {
    // Use ES6 export for better compatibility
    module.exports = Member;
    exports.default = Member;
}