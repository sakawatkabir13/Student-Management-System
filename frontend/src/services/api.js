import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const studentService = {
  // Get all students
  getAllStudents: () => api.get('/students'),
  
  // Get student by ID
  getStudentById: (id) => api.get(`/students/${id}`),
  
  // Create new student
  createStudent: (student) => api.post('/students', student),
  
  // Update student
  updateStudent: (id, student) => api.put(`/students/${id}`, student),
  
  // Delete student
  deleteStudent: (id) => api.delete(`/students/${id}`),
  
  // Search students by name
  searchStudentsByName: (name) => api.get(`/students/search/name?name=${name}`),
  
  // Search students by course
  searchStudentsByCourse: (course) => api.get(`/students/search/course?course=${course}`),
  
  // Get students by year
  getStudentsByYear: (year) => api.get(`/students/year/${year}`),
};

export default api;
