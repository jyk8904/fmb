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
        				"<img ng-click='vm.uploadImg()' title='업로드' src='assets/img/system/upload_image.png' />" +
        				"</div>" +
        				"<div ng-click='FindImg()' class='saveBtn'>" +
        				"<img ng-click='vm.FindImg(vm.eqptParamVo.factId)' title='찾기' src='assets/img/system/bg_image_change.png' />" +
        				"</div>" +
            		"</div>"
         }
      })
      /* marquee 태그 용 */
/*      .directive('marqueeBanner', function($timeout){
    	  return {
    		restrict: 'A',
    		scope: {
      		  alarmList:'='
      	  },
    		link: function(scope, element, attrs) {
    			$timeout(function(){
    				var alarmList = scope.alarmList;
    				var listCount = Object.keys(alarmList).length;
    				var calcWidth = (listCount * 480) + 40;
    				element[0].parentNode.style.width = calcWidth + 'px';
    			});
    		}
    	  };
      })*/
      /* 모바일  종합현황 용 - 뒷배경 이미지중 큰 이미지의 경우 높이를 지정하기 위해 사용 */
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
    				  //console.log("리사이즈");
    				  //console.log(default_height, chart_height, height_rate)
    				  //console.log(element);
    			  });
    			  
    			  //추가
				  scope.$on('$destroy', function() {
				      element.off(); // deregister all event handlers
				  })
				  
				  
    		  }
    	  };
      })
      /* 모바일 종합현황 용 - 각 차트를 모바일 크기에 따라 높이를 계산하기 위해 사용 
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
      })*/
      /* 각페이지 최상단 (bc-screen) 용 */
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
    			  
    			//추가
				  scope.$on('$destroy', function() {
				      element.off(); // deregister all event handlers
				  })
    		  }
    	  };
    	  
      })
      /* bcFormHeader 용 */
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
    			//추가
				  scope.$on('$destroy', function() {
				      element.off(); // deregister all event handlers
				  })
    		  }
    	  };
      })
      .directive('backPanelCtrl', function($timeout, $window){
    	  return {
    		  restrict: 'A',
    		  link: function(scope, element, attrs) {
    			  $timeout(function(){
	    			  var default_width = 1920;
	    			  var default_height = 1080;
	    			  
	    			  var width = $window.innerWidth;
	    			  var height = $window.innerHeight;
	    			  
	    			  var wScreenRate = width * 9;
	    			  var hScreenRate = height * 16;
	    			  
	    			  var bg_size = 1920;
	    			  
	    			  if (wScreenRate > hScreenRate) {
	    				  var screenRate = height / default_height;
	    			  }
	    			  
	    			  var target_width = bg_size * screenRate;
	    			  
	    			  var target_left = (width - target_width) / 2;
	    			  
	    			  //onsole.log(target_width, target_left)
	    			  element[0].style.width = target_width + 'px';
	    			  element[0].style.left = target_left + 'px';
    			  });
    			//추가
				  scope.$on('$destroy', function() {
				      element.off(); // deregister all event handlers
				  })
    		  }
    	  }
      })
      /* 설비 버튼 이미지 용 */
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
		  				
		  				var wScreenRate = width * 9;
		    			var hScreenRate = height * 16;
	    				if (width >= default_width) {
	    					var screenRate = 1; 
	    				}
	    				else {
	    					var screenRate = width / default_width;
	    				}
	    				
	    				if (wScreenRate > hScreenRate) 
	    				{
		    				var screenRate = height / 1080;
		    				
		    				//console.log(screenRate)
		    				var bg_size = 1920;
		    				
		    				var bg_width = bg_size * screenRate;
		    				
		    				var target_left = (width - bg_width) / 2;
		    				
		    				scope.data.cssHeight = (parseInt(scope.data.cssHeight.replace("px","")) * screenRate) + 'px';
	    					scope.data.cssWidth = (parseInt(scope.data.cssWidth.replace("px","")) * screenRate) + 'px';
	    					scope.data.cssTop = (parseInt(scope.data.cssTop.replace("px","")) * screenRate) + 'px';
	    					scope.data.cssLeft = ((parseInt(scope.data.cssLeft.replace("px","")) * screenRate) + target_left) + 'px';
	    				}
	    				else 
	    				{
	    					scope.data.cssHeight = (parseInt(scope.data.cssHeight.replace("px","")) * screenRate) + 'px';
	    					scope.data.cssWidth = (parseInt(scope.data.cssWidth.replace("px","")) * screenRate) + 'px';
	    					scope.data.cssTop = (parseInt(scope.data.cssTop.replace("px","")) * screenRate) + 'px';
	    					scope.data.cssLeft = (parseInt(scope.data.cssLeft.replace("px","")) * screenRate) + 'px';
	    				}
    			  });
    			//추가
				  scope.$on('$destroy', function() {
				      element.off(); // deregister all event handlers
				  })
    		  }
    	  };
      })
       /* 설비 버튼 이미지 용 */
      .directive('andonUCtrl', function($window){
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
		  				
		  				var wScreenRate = width * 9;
		    			var hScreenRate = height * 16;
	    				if (width >= default_width) {
	    					var screenRate = 1; 
	    				}
	    				else {
	    					var screenRate = width / default_width;
	    				}
	    				
	    				if (wScreenRate > hScreenRate) 
	    				{
		    				var screenRate = height / 1080;
		    				
		    				//console.log(screenRate)
		    				var bg_size = 1920;
		    				
		    				var bg_width = bg_size * screenRate;
		    				
		    				var target_left = (width - bg_width) / 2;
		    				
		    				scope.data.cssHeight = (parseInt(scope.data.cssHeight.replace("px","")) * screenRate) + 'px';
	    					scope.data.cssWidth = (parseInt(scope.data.cssWidth.replace("px","")) * screenRate) + 'px';
	    					scope.data.cssTop = (parseInt(scope.data.cssTop.replace("px","")) * screenRate) + 'px';
	    					scope.data.cssLeft = ((parseInt(scope.data.cssLeft.replace("px","")) * screenRate) + target_left) + 'px';
	    				}
	    				else 
	    				{
	    					scope.data.cssHeight = (parseInt(scope.data.cssHeight.replace("px","")) * screenRate) + 'px';
	    					scope.data.cssWidth = (parseInt(scope.data.cssWidth.replace("px","")) * screenRate) + 'px';
	    					scope.data.cssTop = (parseInt(scope.data.cssTop.replace("px","")) * screenRate) + 'px';
	    					scope.data.cssLeft = (parseInt(scope.data.cssLeft.replace("px","")) * screenRate) + 'px';
	    				}
    			  });
    			//추가
				  scope.$on('$destroy', function() {
				      element.off(); // deregister all event handlers
				  })
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
				//추가
				  scope.$on('$destroy', function() {
				      element.off(); // deregister all event handlers
				  })
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
	   				  	
	   				  	//console.log(element[0] + "의 값은 !! - " + element[0].style.width , element[0].style.height)
	   				  	//console.log(element[0])
	   				  	if (element[0].style.padding != null)
	   				  	{
	   				  		//console.log(element[0].style.padding)
	   				  	}
   				  	}
				 });
				//추가
				  scope.$on('$destroy', function() {
				      element.off(); // deregister all event handlers
				  })
			 }
		 } 
	  })
	 /* .directive('bgCtrl', function($timeout, $window){
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
	  })*/
	 /* .directive('bgInnerCtrl', function($timeout, $window){
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
	  })*/
	  .directive('popupCtrl', function($timeout, $window){
		  return {
			  restrict: 'A',
			  link: function(scope, element, attrs) {
				  $timeout(function(){
					 
					  var height = $window.innerHeight;
					  
					  var default_height = 1080;
					  
					  var screenRate = height / default_height;
					  
					 // console.log(default_height)
					  //console.log(element)
					  element[0].style.height = element[0].style.height.replace("px","") * screenRate + 'px';
				  });
				//추가
				  scope.$on('$destroy', function() {
				      element.off(); // deregister all event handlers
				  })
			  }
		  }
	  })
	  /* 라인별 생산실적 Head 용 */
	  .directive('gridHeaderCtrl', function($timeout, $window){
		  return {
			  restrict: 'A',
			  scope: {
				   data: '=data',
				   isMobile : '='
					  
			  },
			  link: function(scope, element, attrs) {
				$timeout(function(){
					//console.log(element)
					var width = $window.innerWidth;
					var height = $window.innerHeight;
					 
					var default_width = 1920;
					var default_height = 1080;
					
					var wScreenRate = width * 9;
					var hScreenRate = height * 16;
					
					if (wScreenRate > hScreenRate){
						var screenRate = height / default_height;
					}
					else {
						var screenRate = width / default_width;
					}
					
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
							  var data = "114";
							  var subData = "38";
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
				//추가
				  scope.$on('$destroy', function() {
				      element.off(); // deregister all event handlers
				  })
			  } 
		  }
	  })
	  /* 라인별 생산실적 panel 데이터 용 */
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
					  var height = $window.innerHeight;
					  
					  var default_width = 1920;
					  var default_height = 1080;
					  
					  var wScreenRate = width * 9;
					  var hScreenRate = height * 16;
					  
					  if (wScreenRate > hScreenRate){
							var screenRate = height / default_height;
					  }
						else {
							var screenRate = width / default_width;
					  }
					  
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
							  var data = "38";
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
				//추가
				  scope.$on('$destroy', function() {
				      element.off(); // deregister all event handlers
				  })
			  } 
		  }
	  })
	  /* TBM panel 데이터 용 */
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
						//console.log(scope.data);
					  if(scope.data == undefined){
						  panelCtrl()
						  
					  }else{
						  var width = $window.innerWidth;
						  var height = $window.innerHeight;
						  
						  var default_width = 1920;
						  var default_height = 1080;
						  
						  var wScreenRate = width * 9;
						  var hScreenRate = height * 16;
						  
						  if (wScreenRate > hScreenRate){
								var screenRate = height / default_height;
						  }
							else {
								var screenRate = width / default_width;
						  }
						 
						  var length = scope.data.length / 7;

							  if (length <= 1) {
								  var header = "180";
								  var data = "145";
								  var fontSize = "32";
							  }
							  else if (length == 2) {
								  var header = "90";
								  var data = "60";
								  var fontSize = "27";
							  }
							  else if (length == 3) {
								  var header = "70";
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
								  if(element[0].children[i]!=null||element[0].children[i]!=undefined){
									  element[0].children[i].style.height = data + "px";
									  element[0].children[i].style.lineHeight = data + "px";
									  element[0].children[i].style.fontSize = fontSize + "px";
								  }
							  }
						}
					
				  });
				  }
				//추가
				  scope.$on('$destroy', function() {
				      element.off(); // deregister all event handlers
				  })
			  }
		} 
	  }) 
	  .directive('prodPanelCtrl', function($timeout, $window){
		  return {
			  restrict: 'A',
			  scope: {
				/*   data: '=data',*/
				   isMobile : '='
			  },
			  link: function(scope, element, attrs) {
				  panelCtrl();
				  function panelCtrl(){
					  var width = $window.innerWidth;
					  //console.log(width)
					  var default_width = 1920; 
					  var screenRate = width / default_width;
				  if (scope.isMobile) {
					  	var fontSize = 20;
					  	var height = 950;
					  	fontSize = fontSize * screenRate;
					  	height = height * screenRate
				  		//console.log(screenRate)
						element[0].style.fontSize = fontSize+ "px";
				  		element[0].style.height = height+ "px";
				  }
				 }
				//추가
				  scope.$on('$destroy', function() {
				      element.off(); // deregister all event handlers
				  })
			  }
		} 
	  })
	  .directive("slide", function( $animateCss ) {
	    return function(scope, element, attrs) {
	        scope.$watch(attrs.data, function(newVal, oldVal) {
	        	//console.log("와치"+oldVal + " "+newVal)
	        	if(newVal!=undefined|| newVal!=0){
	        	//console.log("너비+화면너비: "+(scope.alarmListWdth+scope.screenWdth)+" 시간: "+(scope.alarmListWdth+scope.screenWdth)/180)
	        		$animateCss(element,{
	            	              
	              from    : {'margin-left': scope.screenWdth},
	              to      : {'margin-left': -scope.alarmListWdth},
	              duration: (scope.alarmListWdth+scope.screenWdth)/180 ,
	            })
	            .start()
	            .done(onComplete);                  
	
				
	        	}
	       });
	        function onComplete(){ 
				//console.log('Done slide = '); 
				scope.getAlarmList();
	        };      
	      //추가
			  scope.$on('$destroy', function() {
			      element.off(); // deregister all event handlers
			  })
	    }
	    
	  
	  });
