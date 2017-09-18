/**  
 * @Class Name : mdDragDrtv.js
 * @Description : draggable 관련 directive
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
/*    .directive('customKeypress', function($document,$compile){
    	return {
    		restrict: 'A',
    		controller: function ($scope){
    			this.keyStatus = function() {
    				var lastEvent;
    	    		var heldKeys = false;
    	    		
    	    		$document.on('keydown', function(e) {
    	    			if (e.key == 'Control')
    	    			{
    	    				if (lastEvent && lastEvent.key == e.key) {
    		    				return
    		    			}
    	    				lastEvent = e;
    	    				heldKeys = true;
	    				
    	    				angular.element(document.getElementsByClassName('snapLiner')).css('display','none');
    	    				//elem.draggable({ grid: [1, 1]});
    	    				console.log("control key press")
    	    				console.log(elem)
    	    			}
    	    		});
    	    		
    	    		
    	    		$document.on('keyup', function(e){
    	    			if (e.key == 'Control')
    	    			{
    	    				lastEvent = null;
    	    				heldKeys = false;
    	    				
    	    				angular.element(document.getElementsByClassName('snapLiner')).css('display','block');
    	    				//elem.draggable({ grid: [1, 1], snap: ".snapLiner"});
    	    				console.log("control key not press")
    	    			}
    	    		});
    			};
    		},
	    	link: function(scope, element, attr) {
	    		var lastEvent;
	    		var heldKeys = {};
	    		var cloneCode;
	    		
	    		$document.on('keydown', function(e) {
	    			if (e.key == 'Control')
	    			{
	    				if (lastEvent && lastEvent.key == e.key) {
		    				return
		    			}
	    				lastEvent = e;
	    				heldKeys[e.key] = true;
	    				cloneCode = angular.element(document.getElementsByClassName('snapLiner')).clone();
	    				angular.element(document.getElementsByClassName('snapLiner')).remove();    				
	    			}
	    		});
	    		
	    		$document.on('keyup', function(e){
	    			if (e.key == 'Control')
	    			{
	    				lastEvent = null;
	    				delete heldKeys[e.key];
	    				angular.element(document.getElementById('EQPT')).append($compile(cloneCode)(scope));
	    				scope.$apply();
	    			}
	    		});
	    	}
    	}
    })*/
   .directive('ngDraggable',function($document, $filter, $compile){
	   return {
		   restrict: 'A',
		   scope: {
			   dragOptions: '=ngDraggable'
			 , eqptList: '=taskData'
			 , $index: '=targetData'
		     , rating: '=rating'
		   },
		   link: function(scope, element, attr) {
			   element.draggable({ grid: [1, 1]});
			   
			   scope.$watch('rating', function(newVal, oldVal){
				   if (newVal){
					   element.draggable({ grid: [scope.rating, scope.rating]});
				   }
			   }, true);
			   
			   var startX, startY, x = 0, y = 0,
		   	   start, stop, drag, container;
			   
			   if (scope.dragOptions) {
				   start  = scope.dragOptions.start;
			        drag   = scope.dragOptions.drag;
			        stop   = scope.dragOptions.stop;
			        var id = scope.dragOptions.container;
			       if(id){ 
			    	   container = document.getElementById(id).getBoundClinetRect();
			       }
			   }

			// Bind mousedown event
			      element.on('mousedown', function(e) {
			    	 // console.log(scope.rating)
			        e.preventDefault();
			        startX = e.clientX - element[0].offsetLeft;
			        startY = e.clientY - element[0].offsetTop;
			        $document.on('mousemove', mousemove);
			        $document.on('mouseup', mouseup);
			        
			        if (start) start(e);
			        
			        makeLiner(startX, startY);
			        
			      });
			   
			   // Handle drag event
			      function mousemove(e) {
			    	 
			        var targetTop = element[0].style.top;
			        var targetLeft = element[0].style.left;
			        
			        makeLiner(targetTop, targetLeft);
			        
			        if (drag) drag(e);
			      }
			      
			   // Unbind drag events
		      function mouseup(e) {
		        $document.unbind('mousemove', mousemove);
		        $document.unbind('mouseup', mouseup);
		        angular.element(document.getElementById('matchTopLiner')).remove();
		        angular.element(document.getElementById('matchLeftLiner')).remove();
		        angular.element(document.getElementsByClassName('snapLiner')).remove();
		        if (stop) stop(e);
		        
		        // draggable 로 변경된 값 세팅

		        scope.eqptList[scope.$index].cssTop = element[0].style.top;
		        scope.eqptList[scope.$index].cssLeft = element[0].style.left; 
		        scope.$apply();
		      }
			    
		   // Move element, within container if provided
		      function setPosition() {
		        if (container) {
		          if (x < container.left) {
		            x = container.left;
		          } else if (x > container.right - width) {
		            x = container.right - width;
		          }
		          if (y < container.top) {
		            y = container.top;
		          } else if (y > container.bottom - height) {
		            y = container.bottom - height;
		          }
		        }

		      }
		      
		      function makeLiner(targetTop, targetLeft) {
		    	  var filtered=[];
			        for(var i = 0; i < scope.eqptList.length; i++) {
			        	if (i != scope.$index) {
			        		filtered.push(scope.eqptList[i]);
			        	}
			        }
			        var topMatch = $filter('filter')(filtered, {cssTop : targetTop});
			        var leftMatch = $filter('filter')(filtered, {cssLeft: targetLeft});
			        
			        if(topMatch.length >= 1) 
			        {
			        	if (angular.element(document.getElementById('matchTopLiner'))) {
			        		angular.element(document.getElementById('matchTopLiner')).remove();
			        	}
			        	angular.element(document.getElementById('EQPT')).append($compile("<div id='matchTopLiner' class='matchTopLiner' style='position:absolute; width:1920px; height:1px; border-top:solid aqua 1px; top:" + targetTop + "'><div class='topLinerIndic' style='position:absolute; width:55px; height:24px; background-color:aqua; left:1865px; text-align:center;'>" + targetTop + "</div></div>")(scope));
			        } 
			        else
			        {
			        	angular.element(document.getElementById('matchTopLiner')).remove();
			        }
			        if(leftMatch.length >= 1)
			        {
			        	if (angular.element(document.getElementById('matchLeftLiner'))) {
			        		angular.element(document.getElementById('matchLeftLiner')).remove();
			        	}
			        	angular.element(document.getElementById('EQPT')).append($compile("<div id='matchLeftLiner' class='matchLeftLiner' style='position:absolute; width:1px; height:920px; border-left:solid aqua 1px; left:" + targetLeft + "'><div class='leftLinerIndic' style='position:absolute; width:55px; height:24px; background-color:aqua; top:890px; text-align:center;'>" + targetLeft + "</div></div>")(scope));
			        }
			        else
			        {
			        	angular.element(document.getElementById('matchLeftLiner')).remove();
			        }
		      }
			   /*var startX, startY, x = 0, y = 0,
			   	   start, stop, drag, container;
			   
			   var width = element[0].offsetWidth;
			   var height = element[0].offsetHeight;
			   
			   if (scope.dragOptions) {
				   start  = scope.dragOptions.start;
			        drag   = scope.dragOptions.drag;
			        stop   = scope.dragOptions.stop;
			        var id = scope.dragOptions.container;
			       if(id){ 
			    	   container = document.getElementById(id).getBoundClinetRect();
			       }
			   }
			   
			   // Bind mousedown event
			      element.on('mousedown', function(e) {
			        e.preventDefault();
			        startX = e.clientX - element[0].offsetLeft;
			        startY = e.clientY - element[0].offsetTop;
			        $document.on('mousemove', mousemove);
			        $document.on('mouseup', mouseup);
			        if (start) start(e);
			      });
			      
			      // Handle drag event
			      function mousemove(e) {
			        y = e.clientY - startY;
			        x = e.clientX - startX;
			        setPosition();
			        if (drag) drag(e);
			      }

			      // Unbind drag events
			      function mouseup(e) {
			        $document.unbind('mousemove', mousemove);
			        $document.unbind('mouseup', mouseup);
			        if (stop) stop(e);
			        
			        // draggable 로 변경된 값 세팅

			        scope.eqptList[scope.$index].cssTop = element[0].style.top;
			        scope.eqptList[scope.$index].cssLeft = element[0].style.left; 
			        scope.$apply();

			      }
			      
			      // Move element, within container if provided
			      function setPosition() {
			        if (container) {
			          if (x < container.left) {
			            x = container.left;
			          } else if (x > container.right - width) {
			            x = container.right - width;
			          }
			          if (y < container.top) {
			            y = container.top;
			          } else if (y > container.bottom - height) {
			            y = container.bottom - height;
			          }
			        }

			        element.css({
			          top: y + 'px',
			          left:  x + 'px'
			        });
			      }*/
			    }
			  }
   });

    

