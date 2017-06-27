<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
</head>
<body>


<div ng-app="myApp">
<div ng-controller="myCtrl">

  <p>Name : <input type="text" ng-model="name"></p>
  <h1>Hello {{name}}</h1>
  
<button ng-click='btnFmb001Click'>fmb001화면</button>
</div>
</div>



<script>
var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
    
     
 	 $scope.btnFmb001Click = btnFmb001ClickHandler(); 
	
	
});

function btnFmb001ClickHandler() {
	 	$location.url('#!Fmb001'); 
	}  
</script>


	<script src="modules/fmb/controllers/fmb001Ctrl.js"></script>
</body>
</html>