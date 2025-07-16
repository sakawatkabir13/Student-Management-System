import React, { useState, useEffect } from 'react';
import { Table, Button, Alert, Row, Col, Form, InputGroup, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { studentService } from '../services/api';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [yearFilter, setYearFilter] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await studentService.getAllStudents();
      setStudents(response.data);
      setError('');
    } catch (error) {
      setError('Failed to fetch students. Please try again.');
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentService.deleteStudent(id);
        fetchStudents(); // Refresh the list
      } catch (error) {
        setError('Failed to delete student. Please try again.');
        console.error('Error deleting student:', error);
      }
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchStudents();
      return;
    }

    try {
      setLoading(true);
      let response;
      
      if (searchType === 'name') {
        response = await studentService.searchStudentsByName(searchTerm);
      } else if (searchType === 'course') {
        response = await studentService.searchStudentsByCourse(searchTerm);
      }
      
      setStudents(response.data);
      setError('');
    } catch (error) {
      setError('Failed to search students. Please try again.');
      console.error('Error searching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleYearFilter = async (year) => {
    setYearFilter(year);
    if (!year) {
      fetchStudents();
      return;
    }

    try {
      setLoading(true);
      const response = await studentService.getStudentsByYear(parseInt(year));
      setStudents(response.data);
      setError('');
    } catch (error) {
      setError('Failed to filter students. Please try again.');
      console.error('Error filtering students:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setYearFilter('');
    fetchStudents();
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Student List</h2>
        <Link to="/students/new">
          <Button variant="primary">Add New Student</Button>
        </Link>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Search and Filter Section */}
      <Card className="search-container">
        <Row>
          <Col md={6}>
            <InputGroup>
              <Form.Select 
                value={searchType} 
                onChange={(e) => setSearchType(e.target.value)}
                style={{ maxWidth: '150px' }}
              >
                <option value="name">Name</option>
                <option value="course">Course</option>
              </Form.Select>
              <Form.Control
                type="text"
                placeholder={`Search by ${searchType}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button variant="primary" onClick={handleSearch}>
                Search
              </Button>
            </InputGroup>
          </Col>
          <Col md={4}>
            <Form.Select 
              value={yearFilter} 
              onChange={(e) => handleYearFilter(e.target.value)}
            >
              <option value="">Filter by Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </Form.Select>
          </Col>
          <Col md={2}>
            <Button variant="outline-secondary" onClick={clearFilters}>
              Clear Filters
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Student Table */}
      <Card>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Course</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No students found
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.firstName} {student.lastName}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.course}</td>
                  <td>{student.yearOfStudy}</td>
                  <td>
                    <Link to={`/students/${student.id}`}>
                      <Button variant="info" size="sm" className="me-2">
                        View
                      </Button>
                    </Link>
                    <Link to={`/students/edit/${student.id}`}>
                      <Button variant="warning" size="sm" className="me-2">
                        Edit
                      </Button>
                    </Link>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>

      <div className="mt-3 text-muted">
        Total Students: {students.length}
      </div>
    </div>
  );
};

export default StudentList;
