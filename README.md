# Student Management System

A comprehensive full-stack web application for managing student records, built with React frontend, Java Spring Boot backend, and MySQL database.

## Features

- **Student Management**: Add, view, edit, and delete student records
- **Search & Filter**: Search students by name, course, or filter by year of study
- **Responsive Design**: Modern, mobile-friendly interface using React Bootstrap
- **RESTful API**: Well-structured backend API with proper error handling
- **Database Integration**: MySQL database with proper indexing and relationships
- **Validation**: Frontend and backend validation for data integrity

## Technology Stack

### Frontend
- **React** 18.2.0
- **React Router** for navigation
- **React Bootstrap** for UI components
- **Axios** for API calls
- **HTML5, CSS3, JavaScript ES6+**

### Backend
- **Java 17**
- **Spring Boot 3.1.0**
- **Spring Data JPA** for database operations
- **Spring Web** for REST API
- **Maven** for dependency management

### Database
- **MySQL 8.0**
- **JPA/Hibernate** for ORM

## Project Structure

```
Student Management System/
├── backend/                      # Spring Boot backend
│   ├── src/main/java/com/studentmanagement/
│   │   ├── config/              # Configuration classes
│   │   ├── controller/          # REST controllers
│   │   ├── model/              # Entity classes
│   │   ├── repository/         # Data access layer
│   │   ├── service/            # Business logic
│   │   └── StudentManagementApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/                    # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── services/          # API service layer
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── database/
│   └── setup.sql              # Database schema and sample data
└── README.md
```

## Prerequisites

- **Java 17** or higher
- **Node.js 16** or higher
- **MySQL 8.0** or higher
- **Maven 3.6** or higher
- **Git**

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/sakawatkabir13/Student-Management-System.git
cd student-management-system
```

### 2. Database Setup

1. Install MySQL and create a database:
```sql
CREATE DATABASE student_management_db;
```

2. Update database configuration in `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/student_management_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

3. Run the SQL script to create tables and insert sample data:
```bash
mysql -u your_username -p student_management_db < database/setup.sql
```

### 3. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Build and run the Spring Boot application:
```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 4. Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React application:
```bash
npm start
```

The frontend will start on `http://localhost:3000`

## API Endpoints

### Students
- `GET /api/students` - Get all students
- `GET /api/students/{id}` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/{id}` - Update student
- `DELETE /api/students/{id}` - Delete student
- `GET /api/students/search/name?name={name}` - Search students by name
- `GET /api/students/search/course?course={course}` - Search students by course
- `GET /api/students/year/{year}` - Get students by year of study

## Usage

1. **Home Page**: Overview of the system with statistics and navigation
2. **Student List**: View all students with search and filter options
3. **Add Student**: Form to add new student records
4. **Edit Student**: Update existing student information
5. **Student Details**: View detailed information about a specific student
6. **Delete Student**: Remove student records with confirmation

## Development

### Running in Development Mode

1. Start the backend server:
```bash
cd backend
mvn spring-boot:run
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

### Building for Production

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Build the backend:
```bash
cd backend
mvn clean package
```

## Configuration

### Backend Configuration
- Database settings: `backend/src/main/resources/application.properties`
- CORS settings: `backend/src/main/java/com/studentmanagement/config/CorsConfig.java`

### Frontend Configuration
- API base URL: `frontend/src/services/api.js`
- Bootstrap theme: `frontend/src/index.css`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact [tanveersakawat13@gmail.com]

## Screenshots

*Add screenshots of your application here*

## Future Enhancements

- User authentication and authorization
- Grade management system
- Attendance tracking
- Email notifications
- Report generation
- File upload for student photos
- Advanced search and filtering
- Mobile app version
