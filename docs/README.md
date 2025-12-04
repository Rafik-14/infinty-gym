# Infinity Gym - Technical Documentation

## Overview
This folder contains the technical documentation for the Infinity Gym management system, including various diagrams and data structure definitions.

## Documentation Files

### [Class Diagram](CLASS_DIAGRAM.md)
Detailed UML class diagram showing the structure and relationships between the main classes in the system:
- Member class
- Membership class
- GymManager class

### [Entity Relationship Diagram](ER_DIAGRAM.md)
Database-style entity relationship diagram illustrating how data entities are connected:
- GYM_MANAGER entity
- MEMBER entity
- MEMBERSHIP_PLAN entity
- MEMBERSHIP_FEATURE entity

### [Data Structures](DATA_STRUCTURES.md)
Comprehensive documentation of data models used in the system:
- Member data structure
- Membership data structure
- GymManager data structure
- Statistics data structure
- Relationship mappings
- Validation rules
- Example data

### [Use Case Diagram](USE_CASE_DIAGRAM.md)
System use cases showing interactions between different actors and functionalities:
- Gym Manager use cases
- Gym Member use cases
- System Administrator use cases
- Detailed use case descriptions

### [Sequence Diagram](SEQUENCE_DIAGRAM.md)
Sequence of interactions between objects for key operations:
- Member registration sequence
- Membership renewal sequence
- Member search sequence
- Statistics generation sequence

### [Activity Diagram](ACTIVITY_DIAGRAM.md)
Workflow and business processes using activity diagrams:
- Member registration workflow
- Membership renewal workflow
- Member management workflow
- Statistics generation workflow

## System Architecture
The Infinity Gym system follows a client-side JavaScript architecture with no backend dependencies. All data is stored in-memory and managed through the GymManager class.

## Usage
These diagrams and documentation can be used to:
1. Understand the system architecture
2. Extend the existing functionality
3. Maintain the codebase
4. Onboard new developers
5. Plan future enhancements
6. Analyze system workflows and processes

## Technologies Used
- JavaScript ES6+ classes
- UML notation for various diagrams
- Entity-relationship modeling
- Markdown documentation format
- Mermaid diagram syntax