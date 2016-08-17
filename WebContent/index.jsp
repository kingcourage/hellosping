<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/js/jquery-easyui-1.5/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/js/jquery-easyui-1.5/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/js/jquery-easyui-1.5/demo.css">
<script type="text/javascript" src="${pageContext.request.contextPath }/js/jquery.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/js/jquery-easyui-1.5/jquery.easyui.min.js"></script>
<script type="text/javascript">

$('#dt').datetimebox('setValue', '6/1/2012 12:30:56');	// set datetimebox value
var v = $('#dt').datetimebox('getValue');		// get datetimebox value
alert(v);
</script>
<title>Insert title here</title>
</head>
<body>


<<input class="easyui-datetimebox" name="birthday"
    data-options="required:true,showSeconds:false" value="3/4/2010 2:3" style="width:150px">
    <input id="dt" type="text" name="birthday">
</body>
</html>