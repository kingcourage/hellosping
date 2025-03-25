package com.wcy.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.wcy.entity.Student;
import com.wcy.service.StudentService;

@Controller
@RequestMapping("/student")
public class StudentController {
	@Resource 
	StudentService studentService;
	
	/**
	 * Handles HTTP GET requests to the "/hello" endpoint.
	 * 
	 * This method is mapped to the "/hello" URL path using the @RequestMapping annotation.
	 * When this endpoint is accessed, it returns a String that likely represents a view name
	 * for rendering a login page.
	 * 
	 * @return A String value "login", which may be used as a view name in a web application
	 *         to display a login page or redirect to a login-related resource.
	 */
	@RequestMapping("/hello")
	public String hello(){
		return "login";
	}
		
	/**
	 * Handles the login process for a student.
	 * 
	 * @param student The Student object containing login credentials
	 * @param model The Model object to add attributes for view rendering
	 * @param request The HttpServletRequest object to retrieve request parameters
	 * @return A String representing the view name to be rendered ("success" or "login")
	 */
	@RequestMapping("/login")
	public String login(Student student,Model model,HttpServletRequest request){
		Student stu = studentService.login(student);
		System.out.println(student.getUsername());
		System.out.println(student.getPassword());
		if(stu!=null){
			System.out.println("成功");
			return "success";
		}else{
			model.addAttribute("username",request.getParameter("username"));
			model.addAttribute("password",request.getParameter("password"));
			model.addAttribute("message","对不起，用户名或密码错误");
			System.out.println("失败");
			return "login";
		}
	}
}
