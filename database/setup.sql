-- Student Management System Database Setup
-- MySQL Database Schema

-- Create database
CREATE DATABASE IF NOT EXISTS student_management_db;
USE student_management_db;

-- Create students table
CREATE TABLE IF NOT EXISTS students (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15),
    course VARCHAR(100),
    year_of_study INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_students_email ON students(email);
CREATE INDEX idx_students_name ON students(first_name, last_name);
CREATE INDEX idx_students_course ON students(course);
CREATE INDEX idx_students_year ON students(year_of_study);

-- Insert sample data
INSERT INTO students (first_name, last_name, email, phone, course, year_of_study) VALUES
('John', 'Doe', 'john.doe@example.com', '1234567890', 'Computer Science', 2),
('Jane', 'Smith', 'jane.smith@example.com', '9876543210', 'Information Technology', 1),
('Michael', 'Johnson', 'michael.johnson@example.com', '5555555555', 'Software Engineering', 3),
('Emily', 'Brown', 'emily.brown@example.com', '1111111111', 'Computer Science', 4),
('David', 'Wilson', 'david.wilson@example.com', '2222222222', 'Data Science', 2);

-- Show the created table structure
DESCRIBE students;

-- Display sample data
SELECT * FROM students;
