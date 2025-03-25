package com.wcy.service;

import com.wcy.entity.Student;

public interface StudentService {
	/**
	 * Authenticates a student and logs them into the system.
	 * 
	 * @param student The Student object containing login credentials
	 * @return The authenticated Student object with updated session information
	 */
	public Student login(Student student);
}
