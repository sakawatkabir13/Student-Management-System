import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { studentService } from '../services/api';

const StudentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    course: '',
    yearOfStudy: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (isEdit) {
      fetchStudent();
    }
  }, [id, isEdit]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!student.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (student.firstName.length < 2) {
      errors.firstName = 'First name must be at least 2 characters';
    }

    if (!student.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (student.lastName.length < 2) {
      errors.lastName = 'Last name must be at least 2 characters';
    }

    if (!student.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(student.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (student.phone && student.phone.length < 10) {
      errors.phone = 'Phone number must be at least 10 digits';
    }

    if (student.yearOfStudy && (student.yearOfStudy < 1 || student.yearOfStudy > 4)) {
      errors.yearOfStudy = 'Year of study must be between 1 and 4';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError('');

      const studentData = {
        ...student,
        yearOfStudy: student.yearOfStudy ? parseInt(student.yearOfStudy) : null
      };

      if (isEdit) {
        await studentService.updateStudent(id, studentData);
      } else {
        await studentService.createStudent(studentData);
      }

      navigate('/students');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError(`Failed to ${isEdit ? 'update' : 'create'} student. Please try again.`);
      }
      console.error('Error saving student:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
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
      <h2>{isEdit ? 'Edit Student' : 'Add New Student'}</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}

      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={student.firstName}
                    onChange={handleChange}
                    isInvalid={!!validationErrors.firstName}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={student.lastName}
                    onChange={handleChange}
                    isInvalid={!!validationErrors.lastName}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={student.email}
                    onChange={handleChange}
                    isInvalid={!!validationErrors.email}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={student.phone}
                    onChange={handleChange}
                    isInvalid={!!validationErrors.phone}
                    placeholder="e.g., 1234567890"
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Course</Form.Label>
                  <Form.Control
                    type="text"
                    name="course"
                    value={student.course}
                    onChange={handleChange}
                    placeholder="e.g., Computer Science"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Year of Study</Form.Label>
                  <Form.Select
                    name="yearOfStudy"
                    value={student.yearOfStudy}
                    onChange={handleChange}
                    isInvalid={!!validationErrors.yearOfStudy}
                  >
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.yearOfStudy}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex gap-2">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Saving...' : (isEdit ? 'Update Student' : 'Add Student')}
              </Button>
              <Button variant="secondary" onClick={() => navigate('/students')}>
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StudentForm;
