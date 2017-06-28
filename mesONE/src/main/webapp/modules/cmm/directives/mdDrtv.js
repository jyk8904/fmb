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
            		"</div>"
         }
      })
      .directive('uCtrl', function($timeout, $window){
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
    				 
    				  var calcWidth = element[0].style.width.replace('px','') * screenRate;
    				  var calcHeight = element[0].style.height.replace('px','') * screenRate;
    				  var calcTop = element[0].style.top.replace('px','') * screenRate;
    				  var calcLeft = element[0].style.left.replace('px','') * screenRate;
    				  
        			  element[0].style.width = calcWidth + 'px';
        			  element[0].style.height = calcHeight + 'px';
        			  element[0].style.top = calcTop + 'px';
        			  element[0].style.left = calcLeft + 'px';
        			  
    				  element[0].childNodes[1].style.width = calcWidth + 'px';
    				  element[0].childNodes[1].style.height = calcHeight + 'px';
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

					 var default_width = 1920;
	   				 var default_height = 1080;
	   				 
	   				var screenRate = width / default_width;
	   				  	
	   				element[0].style.height = (element[0].offsetHeight * screenRate) - 1 + 'px';
					 
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
   				  
   				  	var default_width = 1920;
   				  	var default_height = 1080;
   				  
   				  	var screenRate = width / default_width;
   				  	
   				  	element[0].style.width = (element[0].offsetWidth * screenRate) - 1 + 'px';
   				  	element[0].style.height = (element[0].offsetHeight * screenRate) - 1 + 'px';
   				  	
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
					 
					  console.log(scope.data);
				  });
			  } 
		  }
	  });