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
	
	@RequestMapping("/hello")
	public String hello(){
		return "login";
	}
		
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
