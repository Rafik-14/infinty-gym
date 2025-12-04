# Infinity Gym - Sequence Diagrams

## Overview
This document describes the sequence of interactions between objects in the Infinity Gym management system for various key operations.

## Sequence Diagrams

### Member Registration Sequence

```mermaid
sequenceDiagram
    participant U as User
    participant GM as GymManager
    participant M as Member
    participant MS as Membership

    U->>GM: Request to register new member
    GM->>GM: Display registration form
    U->>GM: Submit member details
    GM->>GM: Validate input data
    alt Data is valid
        GM->>M: Create new Member object
        M->>M: Initialize with provided data
        GM->>MS: Get membership plan by type
        MS->>GM: Return membership plan
        GM->>GM: Link member to membership
        GM->>GM: Add member to members list
        GM->>U: Display success message
    else Data is invalid
        GM->>U: Display error message
        U->>GM: Correct input data
    end
```

### Membership Renewal Sequence

```mermaid
sequenceDiagram
    participant M as Member
    participant GM as GymManager
    participant MS as Membership
    participant P as PaymentProcessor

    M->>GM: Request membership renewal
    GM->>GM: Authenticate member
    GM->>M: Get current membership details
    M->>GM: Return membership information
    GM->>MS: Get membership plan details
    MS->>GM: Return plan information
    GM->>GM: Calculate renewal cost
    GM->>M: Display renewal options
    M->>GM: Select renewal period
    GM->>P: Process payment
    P->>P: Handle payment transaction
    alt Payment successful
        P->>GM: Confirm payment
        GM->>M: Update membership expiration
        M->>M: Set new expiration date
        GM->>GM: Update member record
        GM->>M: Send confirmation
    else Payment failed
        P->>GM: Report failure
        GM->>M: Display payment error
    end
```

### Member Search Sequence

```mermaid
sequenceDiagram
    participant GM as GymManager
    participant M as Member

    GM->>GM: Receive search criteria
    GM->>GM: Filter members collection
    loop Through members
        GM->>M: Check if matches criteria
        M->>GM: Return match status
    end
    GM->>GM: Compile search results
    alt Results found
        GM->>GM: Format results
        GM->>GM: Display matching members
    else No results
        GM->>GM: Display no results message
    end
```

### Statistics Generation Sequence

```mermaid
sequenceDiagram
    participant GM as GymManager
    participant M as Member
    participant MS as Membership

    GM->>GM: Request statistics
    GM->>GM: Count total members
    GM->>GM: Filter active members
    loop Count active members
        GM->>M: Check if active
        M->>GM: Return status
    end
    GM->>GM: Count membership plans
    GM->>GM: Compile statistics object
    GM->>GM: Format data for display
    GM->>GM: Return statistics
```

## Detailed Sequence Descriptions

### Member Registration Process
1. User initiates registration by accessing the registration form
2. GymManager displays the registration form to the user
3. User submits personal details and membership preference
4. GymManager validates all input data for correctness
5. If validation passes:
   - GymManager creates a new Member object with provided data
   - GymManager retrieves the appropriate Membership plan
   - GymManager links the member to their chosen membership plan
   - GymManager adds the new member to the members collection
   - System confirms successful registration to the user
6. If validation fails:
   - System displays error messages
   - User corrects the input data and resubmits

### Membership Renewal Process
1. Member requests to renew their membership
2. GymManager authenticates the member's identity
3. GymManager retrieves current membership details from the Member object
4. GymManager gets the full membership plan details
5. System calculates renewal cost based on selected period
6. Member selects their preferred renewal period
7. System processes payment through the PaymentProcessor
8. If payment succeeds:
   - PaymentProcessor confirms the transaction
   - GymManager updates the membership expiration date
   - Member object saves the new expiration date
   - GymManager updates the member record in the system
   - System sends confirmation to the member
9. If payment fails:
   - PaymentProcessor reports the failure
   - System displays payment error to the member

### Member Search Process
1. GymManager receives search criteria from user
2. GymManager filters the members collection based on criteria
3. For each member in the collection:
   - GymManager checks if the member matches the search criteria
   - Member returns match status to GymManager
4. GymManager compiles all matching results
5. If matches are found:
   - GymManager formats the results for display
   - GymManager presents the matching members to the user
6. If no matches are found:
   - GymManager displays a "no results" message

### Statistics Generation Process
1. GymManager receives request for statistics
2. GymManager counts total members in the system
3. GymManager filters the members collection to find active members
4. For each member:
   - GymManager checks if the member is active
   - Member returns their status to GymManager
5. GymManager counts the total number of membership plans
6. GymManager compiles all collected data into a statistics object
7. GymManager formats the data for user display
8. GymManager returns the final statistics to the requesting user