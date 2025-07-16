package com.studentmanagement.repository;

import com.studentmanagement.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    // Custom query methods
    Optional<Student> findByEmail(String email);
    
    List<Student> findByFirstNameContainingIgnoreCase(String firstName);
    
    List<Student> findByLastNameContainingIgnoreCase(String lastName);
    
    List<Student> findByCourseContainingIgnoreCase(String course);
    
    List<Student> findByYearOfStudy(Integer yearOfStudy);
    
    boolean existsByEmail(String email);
}
