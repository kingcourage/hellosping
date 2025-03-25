package com.wcy.dao;

import com.wcy.entity.Student;

public interface StudentDao {
	
	/**
	 * Authenticates a student and logs them into the system.
	 * 
	 * @param student The Student object containing login credentials
	 * @return The authenticated Student object with updated session information
	 */
	public Student login(Student student);
}
