/**
 * Represents a gym membership plan
 * @class
 */
class Membership {
    /**
     * Create a membership plan
     * @param {string} type - The membership type (Basic, Standard, Premium)
     * @param {number} monthlyFee - The monthly fee in DA
     * @param {Array<string>} features - List of features included in this membership
     * @param {Object} restrictions - Any restrictions for this membership type
     */
    constructor(type, monthlyFee, features, restrictions = {}) {
        this.type = type;
        this.monthlyFee = monthlyFee;
        this.features = features;
        this.restrictions = restrictions;
        this.isActive = true;
    }

    /**
     * Get the monthly fee formatted as currency
     * @returns {string} The formatted monthly fee
     */
    getFormattedFee() {
        return `${this.monthlyFee}DA/month`;
    }

    /**
     * Check if the membership includes a specific feature
     * @param {string} feature - The feature to check
     * @returns {boolean} Whether the feature is included
     */
    hasFeature(feature) {
        return this.features.includes(feature);
    }

    /**
     * Add a feature to the membership
     * @param {string} feature - The feature to add
     * @returns {void}
     */
    addFeature(feature) {
        if (!this.features.includes(feature)) {
            this.features.push(feature);
        }
    }

    /**
     * Remove a feature from the membership
     * @param {string} feature - The feature to remove
     * @returns {void}
     */
    removeFeature(feature) {
        const index = this.features.indexOf(feature);
        if (index > -1) {
            this.features.splice(index, 1);
        }
    }

    /**
     * Calculate the total cost for a given number of months
     * @param {number} months - Number of months
     * @returns {number} The total cost
     */
    calculateTotalCost(months) {
        return this.monthlyFee * months;
    }

    /**
     * Get membership information as an object
     * @returns {Object} The membership information
     */
    toObject() {
        return {
            type: this.type,
            monthlyFee: this.monthlyFee,
            features: this.features,
            restrictions: this.restrictions,
            isActive: this.isActive
        };
    }
}

// Make the class available for both browser and Node.js
if (typeof window !== 'undefined') {
    window.Membership = Membership;
} else if (typeof module !== 'undefined' && module.exports) {
    // Use ES6 export for better compatibility
    module.exports = Membership;
    exports.default = Membership;
}