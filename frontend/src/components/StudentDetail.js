import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Row, Col, Badge } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { studentService } from '../services/api';

const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      setLoading(true);
      const response = await studentService.getStudentById(id);
      setStudent(response.data);
      setError('');
    } catch (error) {
      setError('Failed to fetch student details. Please try again.');
      console.error('Error fetching student:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentService.deleteStudent(id);
        navigate('/students');
      } catch (error) {
        setError('Failed to delete student. Please try again.');
        console.error('Error deleting student:', error);
      }
    }
  };

  const getYearText = (year) => {
    if (!year) return 'Not specified';
    const yearMap = {
      1: '1st Year',
      2: '2nd Year',
      3: '3rd Year',
      4: '4th Year'
    };
    return yearMap[year] || `${year} Year`;
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

  if (error) {
    return (
      <div>
        <Alert variant="danger">{error}</Alert>
        <Link to="/students">
          <Button variant="primary">Back to Students</Button>
        </Link>
      </div>
    );
  }

  if (!student) {
    return (
      <div>
        <Alert variant="warning">Student not found</Alert>
        <Link to="/students">
          <Button variant="primary">Back to Students</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Student Details</h2>
        <div>
          <Link to="/students">
            <Button variant="outline-secondary" className="me-2">
              Back to List
            </Button>
          </Link>
          <Link to={`/students/edit/${student.id}`}>
            <Button variant="warning" className="me-2">
              Edit
            </Button>
          </Link>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      <Card className="student-card">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">
            {student.firstName} {student.lastName}
            <Badge bg="light" text="dark" className="ms-2">
              ID: {student.id}
            </Badge>
          </h4>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <h5>Personal Information</h5>
              <div className="mb-3">
                <strong>First Name:</strong>
                <p className="mb-1">{student.firstName}</p>
              </div>
              <div className="mb-3">
                <strong>Last Name:</strong>
                <p className="mb-1">{student.lastName}</p>
              </div>
              <div className="mb-3">
                <strong>Email:</strong>
                <p className="mb-1">
                  <a href={`mailto:${student.email}`}>{student.email}</a>
                </p>
              </div>
              <div className="mb-3">
                <strong>Phone:</strong>
                <p className="mb-1">
                  {student.phone ? (
                    <a href={`tel:${student.phone}`}>{student.phone}</a>
                  ) : (
                    'Not provided'
                  )}
                </p>
              </div>
            </Col>
            <Col md={6}>
              <h5>Academic Information</h5>
              <div className="mb-3">
                <strong>Course:</strong>
                <p className="mb-1">{student.course || 'Not specified'}</p>
              </div>
              <div className="mb-3">
                <strong>Year of Study:</strong>
                <p className="mb-1">
                  <Badge bg="info">
                    {getYearText(student.yearOfStudy)}
                  </Badge>
                </p>
              </div>
              <div className="mb-3">
                <strong>Student ID:</strong>
                <p className="mb-1">{student.id}</p>
              </div>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="bg-light">
          <div className="d-flex justify-content-between">
            <small className="text-muted">
              Student record for {student.firstName} {student.lastName}
            </small>
            <div>
              <Link to={`/students/edit/${student.id}`}>
                <Button size="sm" variant="outline-primary" className="me-2">
                  Quick Edit
                </Button>
              </Link>
              <Button 
                size="sm" 
                variant="outline-danger" 
                onClick={handleDelete}
              >
                Delete Record
              </Button>
            </div>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default StudentDetail;
