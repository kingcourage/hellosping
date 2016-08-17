<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/js/jquery-easyui-1.5/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/js/jquery-easyui-1.5/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/js/jquery-easyui-1.5/demo/demo.css">
<script type="text/javascript" src="${pageContext.request.contextPath }/js/jquery.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/js/jquery-easyui-1.5/jquery.easyui.min.js"></script>
<script type="text/javascript">
function submitForm(){
	$('#ff').form('submit');
}
function clearForm(){
	$("#username").val("");
	$("#password").val("");
	
		
}
</script>
</head>
<body>
 <center>
<form >		
	<h2>用户登录</h2>
	<p>Fill the form and submit it.</p>
	<div style="margin:20px 0;"></div>
	<div class="easyui-panel" title="www.wcy.com" style="width:400px">
		<div style="padding:10px 60px 20px 60px">
	    <form id="ff" action="${pageContext.request.contextPath }/student/login.do" method="post">
	   
	    	<table cellpadding="5">	    	
	    		<tr>
	    			<td>用户名:</td>
	    			<td><input class="easyui-textbox"  value="${username }" id="username" type="text" name="username" data-options="required:true" ></input></td>
	    		</tr>
	    		<tr>
	    			<td>密码:</td>
	    			<td><input class="easyui-textbox"  value="${password }" type="password" id="password" name="password" data-options="required:true"></input></td>
	    		</tr>	    		
	    	</table>
	    	 <div style="text-align:center;padding:5px">
	    	<input type="submit" class="easyui-linkbutton"  value="提交"/>
	    	<input type="reset"  class="easyui-linkbutton"  value="重置" />
	    	<center><font color="red">${message }</font></center>
	    </div>
	    </div>
	</div>
	    </form>
	    </center>


	
</body>
</html>