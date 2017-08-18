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
      .directive('mResizeCtrl', function($timeout, $window){
    	  return {
    		  restrict: 'A',
    		  link: function(scope, element, attrs) {
    			  $timeout(function(){
    				  var height = $window.innerHeight;
    				  
    				  var default_height = 1080;
    				  
    				  var target_height = 840;
    				  
    				  var chart_height = element[0].children[0].style.height.replace('px','');
    				  
    				  var height_rate = height / default_height;
    				  
    				  element[0].style.height = target_height * height_rate + 'px';
    				  element[0].children[0].style.height = chart_height * height_rate + 'px';
    				  console.log("리사이즈");
    				  console.log(default_height, chart_height, height_rate)
    				  console.log(element);
    			  });
    		  }
    	  };
      })
      .directive('mResizeCtrl2', function($timeout, $window){
    	  return {
    		  restrict: 'A',
    		  link: function(scope, element, attrs) {
    			  $timeout(function(){
    				  var height = $window.innerHeight;
    				  
    				  var default_height = 1080;
    				  
    				  var target_height = 840;
    				  
    				  var chart_height = element[0].children[0].style.height.replace('px','');
    				  
    				  var height_rate = height / default_height;
    				  
    				  element[0].style.height = target_height * height_rate + 'px';
    				  console.log("리사이즈");
    				  console.log(default_height, chart_height, height_rate)
    				  console.log(element);
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
    				  var default_width = 1920;
    				  
    				  var origin_height = 91;
    				  
    				  var screenRate = width / default_width;
    				  
    				  var apply_height = origin_height * screenRate;
    				  
    				  element[0].style.width = width + 'px';
    				  element[0].style.height = apply_height + 'px';
    				  //element[0].style.height = height + 'px';
    			  });
    		  }
    	  };
      })
      .directive('uCtrl', function($window){
    	  return {
    		  restrict: 'A',
    		  scope : {
    			data : '=data'  
    		  },
    		  link: function(scope, element, attrs) {
    			  scope.$watch('data',function(newVal, oldVal){
 						var width = $window.innerWidth;
		  				var height = $window.innerHeight;
		  				  
		  				var default_width = 1920;
		  				var default_height = 900;
	    				if (width >= default_width) {
	    					var screenRate = 1; 
	    				}
	    				else {
	    					var screenRate = width / default_width;
	    				}
	    				var testRate = height / default_height;
	    				
	    				/*console.log(screenRate, testRate)
	    				console.log(scope.data)*/
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
	  .directive('popupCtrl', function($timeout, $window){
		  return {
			  restrict: 'A',
			  link: function(scope, element, attrs) {
				  $timeout(function(){
					 
					  var height = $window.innerHeight;
					  
					  var default_height = 1080;
					  
					  var screenRate = height / default_height;
					  
					  console.log(default_height)
					  console.log(element)
					  element[0].style.height = element[0].style.height.replace("px","") * screenRate + 'px';
				  });
			  }
		  }
	  })
	  .directive('gridHeaderCtrl', function($timeout, $window){
		  return {
			  restrict: 'A',
			  scope: {
				   data: '=data',
				   isMobile : '='
					  
			  },
			  link: function(scope, element, attrs) {
				$timeout(function(){
					console.log(element)
				  var width = $window.innerWidth;
				  
				  var default_width = 1920;
				  
				  var screenRate = width / default_width;
 
					  var length = scope.data.length / 7;
	
						  if (length <= 1) {
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
						  }else if (length == 3) {
							  var header = "80";
							  var data = "120";
							  var subData = "40";
							  var fontSize = "18";
						  }else if (length == 4) {
							  var header = "39";
							  var data = "93";
							  var subData = "31";
							  var fontSize = "14";
						  }
						  if (scope.isMobile) {
							  header = header * screenRate;
							  data = data * screenRate;
							  subData = subData * screenRate;
							  fontSize = fontSize * screenRate;
						  }
						  element[0].children[0].style.height = header + "px";
						  element[0].children[0].style.lineHeight = header + "px";
						  element[0].children[0].style.fontSize = fontSize + "px";
						  
						  element[0].children[1].style.height = subData + "px";
						  element[0].children[1].style.lineHeight = subData + "px";
						  element[0].children[1].style.fontSize = fontSize + "px";
						  
						  element[0].children[2].style.height = data + "px";
						  element[0].children[2].style.lineHeight = data + "px";
						  
						  element[0].children[2].children[0].style.height = data + "px";
						  element[0].children[2].children[0].style.lineHeight = data + "px";
						  element[0].children[2].children[1].style.height = data + "px";
						  element[0].children[2].children[1].style.lineHeight = data + "px";
						  
						  element[0].children[2].children[1].children[0].style.height = subData + "px";
						  element[0].children[2].children[1].children[0].style.lineHeight = subData + "px";
						  element[0].children[2].children[1].children[1].style.height = subData + "px";
						  element[0].children[2].children[1].children[1].style.lineHeight = subData + "px";
						  element[0].children[2].children[1].children[2].style.height = subData + "px";
						  element[0].children[2].children[1].children[2].style.lineHeight = subData + "px";
						  element[0].children[2].style.fontSize = fontSize + "px";
						  element[0].children[3].style.height = subData + "px";
						  element[0].children[3].style.lineHeight = subData + "px";
						  element[0].children[3].style.fontSize = fontSize + "px";
						  element[0].children[4].style.height = subData + "px";
						  element[0].children[4].style.lineHeight = subData + "px";
						  element[0].children[4].style.fontSize = fontSize + "px";
				  });
			  } 
		  }
	  })
	  .directive('gridPanelCtrl', function($timeout, $window){
		  return {
			  restrict: 'A',
			  scope: {
				   data: '=data',
				   isMobile : '='
			  },
			  link: function(scope, element, attrs) {
				  $timeout(function(){
					 
					 var width = $window.innerWidth;
					  
					  var default_width = 1920;
					  
					  var screenRate = width / default_width;
					  
					  var length = scope.data.length / 7;

						  if (length <= 1) {
							  var header = "150";
							  var data = "125";
							  var fontSize = "27";
						  }
						  else if (length == 2) {
							  var header = "90";
							  var data = "60";
							  var fontSize = "27";
						  }
						  else if (length == 3) {
							  var header = "80";
							  var data = "40";
							  var fontSize = "18";
						  }
						  else if (length == 4) {
							  var header = "39";
							  var data = "31";
							  var fontSize = "14";
						  }
  
						  if (scope.isMobile) {
							  header = header * screenRate;
							  data = data * screenRate;
							  fontSize = fontSize * screenRate;
						  }
						  
				
						  element[0].children[0].style.height = header + "px";
						 /* element[0].children[0].style.lineHeight = header + "px";*/
						  element[0].children[0].style.fontSize = fontSize + "px";

						  for(var i = 1; i < 7; i++)
						  {
							  element[0].children[i].style.height = data + "px";
							  element[0].children[i].style.lineHeight = data + "px";
							  element[0].children[i].style.fontSize = fontSize + "px";
						  }
				  });
			  } 
		  }
	  })
	   .directive('gridTbmPanelCtrl', function($timeout, $window){
		  return {
			  restrict: 'A',
			  scope: {
				   data: '=data',
				   isMobile : '='
			  },
			  link: function(scope, element, attrs) {
				  panelCtrl();
				  function panelCtrl(){

				  $timeout(function(){
						console.log(scope.data);
					  if(scope.data == undefined){
						  panelCtrl()
						  
					  }else{
						  var width = $window.innerWidth;
						  var default_width = 1920; 
						  var screenRate = width / default_width;
						 
						  var length = scope.data.length / 7;

							  if (length <= 1) {
								  var header = "150";
								  var data = "125";
								  var fontSize = "27";
							  }
							  else if (length == 2) {
								  var header = "90";
								  var data = "60";
								  var fontSize = "27";
							  }
							  else if (length == 3) {
								  var header = "80";
								  var data = "40";
								  var fontSize = "18";
							  }
							  else if (length == 4) {
								  var header = "39";
								  var data = "31";
								  var fontSize = "14";
							  }
							  
							  if (scope.isMobile) {
								  header = header * screenRate;
								  data = data * screenRate;
								  fontSize = fontSize * screenRate;
							  }
							  
							  element[0].children[0].style.height = header + "px";
							  element[0].children[0].style.lineHeight = header + "px";
							  element[0].children[0].style.fontSize = fontSize + "px";
							  
							  for(var i = 1; i < 7; i++)
							  {
								  element[0].children[i].style.height = data + "px";
								  element[0].children[i].style.lineHeight = data + "px";
								  element[0].children[i].style.fontSize = fontSize + "px";
							  }
						}
					
				  });
				  }
			  }
		} 
	  }) ;