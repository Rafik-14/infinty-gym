/**
 * Browser example for using the Infinity Gym classes
 */

// Store the gym instance globally so we can access it later
let gymInstance = null;

// Function to update the output display
function updateOutput(message) {
    const outputElement = document.getElementById('gymOutput');
    if (outputElement) {
        outputElement.innerHTML = message;
    }
}

// Function to log messages to both console and UI
function logMessage(message) {
    console.log(message);
    const outputElement = document.getElementById('gymOutput');
    if (outputElement) {
        const currentTime = new Date().toLocaleTimeString();
        outputElement.innerHTML += `<div>[${currentTime}] ${message}</div>`;
        // Scroll to bottom
        outputElement.scrollTop = outputElement.scrollHeight;
    }
}

// This function will be called when the page loads
function initializeGymSystem() {
    try {
        logMessage('Initializing gym system...');
        
        // Create a gym manager
        gymInstance = new GymManager();
        
        // Create some membership plans
        const basicMembership = new Membership('Basic', 2000, [
            'Weight training equipment access',
            'Locker room facilities',
            'Basic gym amenities'
        ]);
        
        const standardMembership = new Membership('Standard', 2500, [
            'Full weight training access',
            'Cardio machines access',
            'Premium locker facilities',
            'Equipment training session'
        ]);
        
        const premiumMembership = new Membership('Premium', 3500, [
            'All Standard features included',
            'Unlimited Group Classes access',
            'Sauna and Wellness Area access',
            'Personalized 1-on-1 Trainer Session (1/month)',
            '24/7 VIP Access',
            'Nutrition Consulting Session (1/month)'
        ]);
        
        // Add memberships to the gym
        gymInstance.addMembership(basicMembership);
        gymInstance.addMembership(standardMembership);
        gymInstance.addMembership(premiumMembership);
        
        // Create some members
        const member1 = new Member('M001', 'Alice', 'Johnson', 'alice@example.com', '+1234567890', new Date('2023-01-15'), 'Premium');
        const member2 = new Member('M002', 'Bob', 'Smith', 'bob@example.com', '+1987654321', new Date('2023-03-22'), 'Standard');
        const member3 = new Member('M003', 'Carol', 'Williams', 'carol@example.com', '+1122334455', new Date('2023-05-10'), 'Basic');
        
        // Add members to the gym
        gymInstance.addMember(member1);
        gymInstance.addMember(member2);
        gymInstance.addMember(member3);
        
        logMessage('Gym system initialized successfully!');
        logMessage('Click "Show Statistics" to see gym data');
        
        // Expose functions to global scope for testing
        if (typeof window !== 'undefined') {
            window.initializeGymSystem = initializeGymSystem;
            window.showGymStatistics = showGymStatistics;
        }
        
        // You can also expose the gym object to the global scope for debugging
        window.gym = gymInstance;
        console.log('Gym manager is now available as window.gym for debugging');
        
    } catch (error) {
        logMessage('Error initializing gym system: ' + error.message);
        console.error('Error initializing gym system:', error);
    }
}

// Function to show gym statistics
function showGymStatistics() {
    if (!gymInstance) {
        logMessage('Please initialize the gym system first!');
        return;
    }
    
    try {
        logMessage('Retrieving gym statistics...');
        
        // Display gym statistics
        const stats = gymInstance.getStatistics();
        logMessage(`Gym Statistics:`);
        logMessage(`- Total Members: ${stats.totalMembers}`);
        logMessage(`- Active Members: ${stats.activeMembers}`);
        logMessage(`- Membership Plans: ${stats.membershipPlans}`);
        
        // Display active members
        const activeMembers = gymInstance.getActiveMembers();
        logMessage(`Active Members: ${activeMembers.map(m => m.getFullName()).join(', ')}`);
        
    } catch (error) {
        logMessage('Error retrieving statistics: ' + error.message);
        console.error('Error retrieving statistics:', error);
    }
}

// Set up event listeners when the page loads
if (typeof window !== 'undefined') {
    // Always expose functions to global scope
    window.initializeGymSystem = initializeGymSystem;
    window.showGymStatistics = showGymStatistics;
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            // Set up button event listeners
            document.getElementById('initGymBtn')?.addEventListener('click', initializeGymSystem);
            document.getElementById('showStatsBtn')?.addEventListener('click', showGymStatistics);
        });
    } else {
        // Set up button event listeners
        document.getElementById('initGymBtn')?.addEventListener('click', initializeGymSystem);
        document.getElementById('showStatsBtn')?.addEventListener('click', showGymStatistics);
    }
} else if (typeof module !== 'undefined' && module.exports) {
    // Export functions for Node.js environment
    module.exports = {
        initializeGymSystem,
        showGymStatistics
    };
}