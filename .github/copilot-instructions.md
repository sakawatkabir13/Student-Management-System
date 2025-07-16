<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Student Management System - Copilot Instructions

## Project Overview
This is a full-stack Student Management System built with:
- **Frontend**: React, React Bootstrap, Axios
- **Backend**: Java Spring Boot, Spring Data JPA, MySQL
- **Database**: MySQL with proper indexing and relationships

## Code Style Guidelines

### Java/Spring Boot Backend
- Follow standard Java naming conventions (PascalCase for classes, camelCase for methods)
- Use proper Spring Boot annotations (@RestController, @Service, @Repository, etc.)
- Implement proper exception handling and validation
- Use ResponseEntity for API responses
- Follow REST API conventions for endpoints
- Use JPA annotations for entity mapping
- Implement proper CORS configuration

### React Frontend
- Use functional components with hooks
- Follow React best practices and patterns
- Use Bootstrap classes for styling
- Implement proper error handling and loading states
- Use async/await for API calls
- Follow proper component structure and organization
- Use React Router for navigation

### Database
- Use proper MySQL data types and constraints
- Implement proper indexing for performance
- Use descriptive column names with underscores
- Follow normalization principles

## Key Features to Maintain
- CRUD operations for students
- Search and filter functionality
- Responsive design
- Form validation (frontend and backend)
- Error handling and user feedback
- Proper API structure

## Common Patterns
- Use service layer for business logic
- Implement proper validation on both frontend and backend
- Use consistent error handling across the application
- Maintain proper component hierarchy in React
- Use proper HTTP status codes in API responses

## Dependencies
- Backend: Spring Boot, Spring Data JPA, MySQL Connector, Spring Boot Validation
- Frontend: React, React Router, React Bootstrap, Axios, Bootstrap

When making changes, ensure:
1. Consistency with existing code patterns
2. Proper error handling
3. Responsive design principles
4. Clean, readable code
5. Proper validation and security measures
