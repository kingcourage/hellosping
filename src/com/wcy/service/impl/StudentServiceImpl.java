package com.wcy.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.wcy.dao.StudentDao;
import com.wcy.entity.Student;
import com.wcy.service.StudentService;
@Service("studentService")
public class StudentServiceImpl implements StudentService {
	@Resource
	private StudentDao studentDao;
	/**
	 * Authenticates a student and logs them into the system.
	 * 
	 * @param student The Student object containing login credentials
	 * @return The authenticated Student object if login is successful, or null if authentication fails
	 */
	@Override
	public Student login(Student student) {
		// TODO Auto-generated method stub
		return studentDao.login(student);
	}

}
