import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { studentService } from '../services/api';

const Home = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentCount();
  }, []);

  const fetchStudentCount = async () => {
    try {
      const response = await studentService.getAllStudents();
      setTotalStudents(response.data.length);
    } catch (error) {
      console.error('Error fetching student count:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Welcome Section */}
      <div className="welcome-section">
        <h1>Welcome to Student Management System</h1>
        <p className="lead">
          Efficiently manage student records with our comprehensive platform
        </p>
        <Link to="/students">
          <Button variant="light" size="lg" className="mt-3">
            Get Started
          </Button>
        </Link>
      </div>

      {/* Statistics */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="stats-card">
            <Card.Body className="text-center">
              <div className="stats-number">
                {loading ? '...' : totalStudents}
              </div>
              <div className="stats-label">Total Students</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="stats-card">
            <Card.Body className="text-center">
              <div className="stats-number">100%</div>
              <div className="stats-label">System Uptime</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Features */}
      <Row>
        <Col md={4}>
          <Card className="feature-card">
            <Card.Body>
              <div className="feature-icon">📚</div>
              <h5>Manage Students</h5>
              <p>Add, edit, and delete student records with ease</p>
              <Link to="/students">
                <Button variant="primary">View Students</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="feature-card">
            <Card.Body>
              <div className="feature-icon">🔍</div>
              <h5>Search & Filter</h5>
              <p>Find students by name, course, or year of study</p>
              <Link to="/students">
                <Button variant="primary">Search Students</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="feature-card">
            <Card.Body>
              <div className="feature-icon">➕</div>
              <h5>Add New Student</h5>
              <p>Register new students quickly and efficiently</p>
              <Link to="/students/new">
                <Button variant="primary">Add Student</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
