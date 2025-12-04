# Infinity Gym - Data Structures

## Overview
This document describes the data structures used in the Infinity Gym management system, including detailed information about each entity, their attributes, and relationships.

## Data Models

### Member Data Structure

```javascript
{
  "id": "string",           // Unique identifier (UUID)
  "firstName": "string",    // Member's first name (required)
  "lastName": "string",     // Member's last name (required)
  "email": "string",        // Email address (required, unique)
  "phoneNumber": "string",  // Phone number (optional)
  "joinDate": "Date",       // Membership start date (ISO 8601 format)
  "membershipType": "string", // Membership plan type (Basic|Standard|Premium)
  "isActive": "boolean"     // Membership status (true|false)
}
```

#### Member Attributes Details

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| id | String | Yes | Unique identifier for the member |
| firstName | String | Yes | Member's first name |
| lastName | String | Yes | Member's last name |
| email | String | Yes | Valid email address |
| phoneNumber | String | No | Contact phone number |
| joinDate | Date | Yes | ISO 8601 date format (YYYY-MM-DD) |
| membershipType | String | Yes | Membership plan type |
| isActive | Boolean | Yes | Current membership status |

### Membership Data Structure

```javascript
{
  "type": "string",              // Membership type (Basic|Standard|Premium)
  "monthlyFee": "number",        // Monthly fee in DA (decimal)
  "features": ["string"],        // Array of feature names
  "restrictions": {              // Optional restrictions object
    "accessHours": "string",     // Access hours limitation
    "guestPasses": "number"      // Number of guest passes per month
  },
  "isActive": "boolean"          // Plan availability status
}
```

#### Membership Attributes Details

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| type | String | Yes | Membership plan identifier |
| monthlyFee | Number | Yes | Cost per month in DA |
| features | Array[String] | Yes | List of included features |
| restrictions | Object | No | Plan limitations |
| isActive | Boolean | Yes | Plan availability |

##### Restrictions Object Structure

```javascript
{
  "accessHours": "string",    // Optional: Access time limitations
  "guestPasses": "number",    // Optional: Guest passes per month
  "personalTraining": "boolean" // Optional: Personal training sessions
}
```

### GymManager Data Structure

```javascript
{
  "members": [
    // Array of Member objects
  ],
  "memberships": [
    // Array of Membership objects
  ]
}
```

#### GymManager Collections

| Collection | Content | Description |
|------------|---------|-------------|
| members | Array[Member] | All registered gym members |
| memberships | Array[Membership] | Available membership plans |

### Statistics Data Structure

```javascript
{
  "totalMembers": "number",      // Total registered members
  "activeMembers": "number",     // Currently active members
  "membershipPlans": "number"    // Available membership plans
}
```

## Entity Relationships

### Relationship Mapping

1. **GymManager → Members** (1:M)
   - One GymManager instance manages multiple Member instances
   - Relationship maintained through `members` array in GymManager

2. **GymManager → Memberships** (1:M)
   - One GymManager instance contains multiple Membership instances
   - Relationship maintained through `memberships` array in GymManager

3. **Member → Membership** (N:1)
   - Multiple Member instances can subscribe to one Membership type
   - Relationship maintained through `membershipType` attribute in Member

## Data Flow

### Member Registration Process
1. New Member object created with required attributes
2. Member added to GymManager.members array
3. Membership type assigned to Member
4. Member status set to active

### Membership Assignment Process
1. Member selects membership plan from available options
2. Membership type stored in Member.membershipType
3. Member gains access to features defined in Membership.features

### Data Export Structure
When exporting data via `toObject()` methods:

```javascript
{
  "members": [
    // Serialized Member objects
  ],
  "memberships": [
    // Serialized Membership objects
  ],
  "statistics": {
    "totalMembers": number,
    "activeMembers": number,
    "membershipPlans": number
  }
}
```

## Validation Rules

### Member Validation
- Email must be unique across all members
- Email must be valid format
- Join date cannot be in the future
- Membership type must match an existing plan

### Membership Validation
- Monthly fee must be positive
- Features array cannot be empty
- Membership type must be one of predefined values

## Example Data

### Sample Member Object
```javascript
{
  "id": "mem_001",
  "firstName": "Ahmed",
  "lastName": "Benali",
  "email": "ahmed.benali@example.com",
  "phoneNumber": "+213 555 123 456",
  "joinDate": "2025-12-01T00:00:00.000Z",
  "membershipType": "Premium",
  "isActive": true
}
```

### Sample Membership Object
```javascript
{
  "type": "Premium",
  "monthlyFee": 5000,
  "features": [
    "24/7 Access",
    "All Equipment",
    "Personal Training Sessions",
    "Swimming Pool",
    "Spa Access"
  ],
  "restrictions": {
    "guestPasses": 4
  },
  "isActive": true
}
```