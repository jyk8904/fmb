/**  
 * @Class Name : mdDrtv.js
 * @Description : directive
 * @Modification Information  
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017.03.02  jy CHO      최초생성
 * 
 * @author jy.CHO
 * @since 2017.06.19
 * @version 1.0
 * @see
 * 
 *  Copyright (C) by dsinfo Consortium All right reserved.
 */


'use strict';
angular
    .module('app')
    .directive('mdFormHeader', function() {   /* 폼 상단의 타이틀 및 버튼 부분 */
       return {
          restrict: 'E',
          transclude: true,  
          template: "<div bg-ctrl class='row md-form-header' ng-transclude></div>"
       }
    })
    .directive('mdConfigBtn', function() {   /* 폼 상단의 버튼 부분 */
        return {
            restrict: 'E',
            transclude: true,  
            template:"<div class='Btn'>" +
            			"<div ng-click='toggleLeft()' class='configBtn'>" +
            				
            					"<img ng-click='vm.toggleLeft()' title='설정' src='assets/img/system/config_white.png' />" +

            			"</div>" +
            			"<div ng-click='saveEqptData()' class='saveBtn'>" +
            				"<img ng-click='vm.saveEqptData()' title='저장' src='assets/img/system/send_white.png' />" +
            			"</div>" +
            			"<div ng-click='uploadImg(test)' class='saveBtn'>" +
        				"<img ng-click='vm.uploadImg()' title='저장' src='assets/img/system/upload_image.png' />" +
        				"</div>" +
        				"<div ng-click='FindImg()' class='saveBtn'>" +
        				"<img ng-click='vm.FindImg(vm.eqptParamVo.factId)' title='저장' src='assets/img/system/bg_image_change.png' />" +
        				"</div>" +
            		"</div>"
         }
      })
      .directive('marqueeBanner', function($timeout){
    	  return {
    		restrict: 'A',
    		scope: {
      		  alarmList:'='
      	  },
    		link: function(scope, element, attrs) {
    			$timeout(function(){
    				var alarmList = scope.alarmList;
    				var listCount = Object.keys(alarmList).length;
    				var calcWidth = (listCount * 430) + 40;
    				element[0].parentNode.style.width = calcWidth + 'px';
    			});
    		}
    	  };
      })
      .directive('testCtrl', function($timeout, $window){
    	  return {
    		  restrict: 'A',
    		  link: function(scope, element, attrs) {
    			  $timeout(function(){
    				  var width = $window.innerWidth;
    				  var height = $window.innerHeight;
    				  
    				  var default_height = 1080;
    				  var body_hieght = 1055;
    				  
    				  var height_rate = height / default_height;
    				  element[0].style.width = width + 'px';
    				  element[0].style.height = body_hieght * height_rate + 'px';
    				  //element[0].style.height = height + 'px';
    			  });
    		  }
    	  };
      })
      .directive('testCtrl2', function($timeout, $window){
    	  return {
    		  restrict: 'A',
    		  link: function(scope, element, attrs) {
    			  $timeout(function(){
    				  var width = $window.innerWidth;
    				  //var height = '125';
    				  
    				  element[0].style.width = width + 'px';
    				  //element[0].style.height = height + 'px';
    			  });
    		  }
    	  };
      })
 /*     .directive('uCtrl', function($timeout, $window){
    	  return {
    		  restrict: 'A',
    		  link: function(scope, element, attrs) {
   			  $timeout(function(){
    				  var width = $window.innerWidth;
    				  var height = $window.innerHeight;
    				  
    				  var default_width = 1920;
    				  var default_height = 1080;
	    				  if (width >= default_width) {
	    					 var screenRate = 1; 
	    				  }
	    				  else {
	    					 var screenRate = width / default_width;
	    				  }
	    				 console.log(element)
	    				  var calcWidth = element[0].style.width.replace('px','') * screenRate;
	    				  var calcHeight = element[0].style.height.replace('px','') * screenRate;
	    				  var calcTop = element[0].style.top.replace('px','') * screenRate;
	    				  var calcLeft = element[0].style.left.replace('px','') * screenRate;
	    				  
	        			  element[0].style.width = calcWidth + 'px';
	        			  element[0].style.height = calcHeight + 'px';
	        			  element[0].style.top = calcTop + 'px';
	        			  element[0].style.left = calcLeft + 'px';
	        			  console.log(calcWidth, calcHeight);
	    				  element[0].children[0].children[0].style.width = calcWidth + 'px';
	    				  element[0].children[0].children[0].style.height = calcHeight + 'px';
    			  });
    		  }
    	  };
      })*/
      .directive('uCtrl', function($window){
    	  return {
    		  restrict: 'A',
    		  scope : {
    			data : '=data'  
    		  },
    		  link: function(scope, element, attrs) {
    			  scope.$watch('data',function(newVal, oldVal){
    				  	console.log(newVal)
 						var width = $window.innerWidth;
		  				var height = $window.innerHeight;
		  				  
		  				var default_width = 1880;
		  				var default_height = 1080;
	    				if (width >= default_width) {
	    					var screenRate = 1; 
	    				}
	    				else {
	    					var screenRate = width / default_width;
	    				}
	    				console.log(scope.data)
	    					scope.data.cssHeight = (parseInt(scope.data.cssHeight.replace("px","")) * screenRate) + 'px';
	    					scope.data.cssWidth = (parseInt(scope.data.cssWidth.replace("px","")) * screenRate) + 'px';
	    					scope.data.cssTop = (parseInt(scope.data.cssTop.replace("px","")) * screenRate) + 'px';
	    					scope.data.cssLeft = (parseInt(scope.data.cssLeft.replace("px","")) * screenRate) + 'px';
    			  });
    		  }
    	  };
      })
	  .directive('pCtrl', function($timeout, $window){
		 return {
			 restrict: 'A',
			 link: function(scope, element, attrs) {
				 $timeout(function(){
					
					 var width = $window.innerWidth;
					 var height = $window.innerHeight;
					 if (width >= 1024)
					 {
						 var default_width = 1920;
		   				 var default_height = 1080;
		   				 
		   				 var screenRate = width / default_width;
		   				  	
		   				 element[0].style.height = (element[0].offsetHeight * screenRate) - 1 + 'px';
					 } 
				 });
			 }
		 } 
	  })
	  .directive('bgMainCtrl', function($timeout, $window){
		 return {
			 restrict: 'A',
			 link: function(scope, element, attrs) {
				 $timeout(function(){
					
					var width = $window.innerWidth;
   				  	var height = $window.innerHeight;
   				  	
   				  	if (width >= 1024)
   				  	{
	   				  	var default_width = 1920;
	   				  	var default_height = 1080;
	   				  	//console.log('너비는 ' + width + '/' +'높이는 ' + height)
	   				  	var screenRate = width / default_width;
	   				  	
	   				  	element[0].style.width = (element[0].offsetWidth * screenRate) - 1 + 'px';
	   				  	element[0].style.height = (element[0].offsetHeight * screenRate) - 1 + 'px';
	   				  	
	   				  	console.log(element[0] + "의 값은 !! - " + element[0].style.width , element[0].style.height)
	   				  	console.log(element[0])
	   				  	if (element[0].style.padding != null)
	   				  	{
	   				  		console.log(element[0].style.padding)
	   				  	}
   				  	}
				 });
			 }
		 } 
	  })
	  .directive('bgCtrl', function($timeout, $window){
		 return {
			 restrict: 'A',
			 link: function(scope, element, attrs) {
				 $timeout(function(){
					
					var width = $window.innerWidth;
   				  	var height = $window.innerHeight;
   				  
   				  	var default_width = 1920;
   				  	var default_height = 1080;
   				  	
   				  	if (width >= 1024)
   				  	{
	   				  	//console.log('너비는 ' + width + '/' +'높이는 ' + height)
	   				  	var screenRate = width / default_width;
	   				  	
	   				  	element[0].style.width = (element[0].offsetWidth * screenRate) - 1 + 'px';
	   				  	element[0].style.height = (element[0].offsetHeight * screenRate) - 1 + 'px';
	   				  	
	   				  	console.log(element[0] + "의 값은 !! - " + element[0].style.width , element[0].style.height)
	   				  	console.log(element[0])
	   				  	if (element[0].style.padding != null)
	   				  	{
	   				  		console.log(element[0].style.padding)
	   				  	}
   				  	}
				 });
			 }
		 } 
	  })
	  .directive('bgInnerCtrl', function($timeout, $window){
		 return {
			 restrict: 'A',
			 link: function(scope, element, attrs) {
				 $timeout(function(){
					
					var width = $window.innerWidth;
   				  	var height = $window.innerHeight;
   				  	
   				  	if (width >= 1024)
   				  	{
	   				  	var default_width = 1920;
	   				  	var default_height = 1080;
	   				  
	   				  	var screenRate = width / default_width;
	   				  	
	   				  	element[0].style.width = (element[0].offsetWidth * screenRate) - 1 + 'px';
	   				  	element[0].style.height = (element[0].offsetHeight * screenRate) - 1 + 'px';
   				  	}
				 });
			 }
		 } 
	  })
	  .directive('gridHeaderCtrl', function($timeout){
		  return {
			  restrict: 'A',
			  scope: {
				   data: '=data'
			  },
			  link: function(scope, element, attrs) {
				  $timeout(function(){
					 
					  var length = scope.data.length / 7;
					  if (length < 3)
					  {
						  if (length == 1) {
							  var header = "150";
							  var data = "375";
							  var subData = "125";
							  var fontSize = "30";
						  }
						  else if (length == 2) {
							  var header = "90";
							  var data = "180";
							  var subData = "60";
							  var fontSize = "27";
						  }
						  
						  element[0].children[0].children[0].style.height = header + "px";
						  element[0].children[0].children[1].style.height = subData + "px";
						  element[0].children[0].children[2].children[0].style.height = data + "px";
						  element[0].children[0].children[2].children[1].style.height = subData + "px";
						  element[0].children[0].children[3].children[0].style.height = subData + "px";
						  element[0].children[0].children[4].children[0].style.height = subData + "px";
						  element[0].children[0].children[5].style.height = subData + "px";
						  element[0].children[0].children[6].style.height = subData + "px";
						  
						  for (var i = 0; i < 7; i++)
						  {
							  element[0].children[0].children[i].style.fontSize = fontSize + "px";
						  }
					  }
				  });
			  } 
		  }
	  })
	  .directive('gridPanelCtrl', function($timeout){
		  return {
			  restrict: 'A',
			  scope: {
				   data: '=data'
			  },
			  link: function(scope, element, attrs) {
				  $timeout(function(){
					 console.log(element)
					  var length = scope.data.length / 7;
					  if (length < 3)
					  {
						  if (length == 1) {
							  var header = "150";
							  var data = "125";
							  var fontSize = "27";
						  }
						  else if (length == 2) {
							  var header = "90";
							  var data = "60";
							  var fontSize = "27";
						  }
						  
						  element[0].children[0].children[0].children[0].style.height = header + "px";
						  element[0].children[0].children[0].children[0].style.fontSize = fontSize + "px";
						  for(var i = 1; i < 7; i++)
						  {
							  element[0].children[0].children[0].children[i].style.height = data + "px";
							  element[0].children[0].children[0].children[i].style.fontSize = fontSize + "px";
						  }
					  }
				  });
			  } 
		  }
	  });