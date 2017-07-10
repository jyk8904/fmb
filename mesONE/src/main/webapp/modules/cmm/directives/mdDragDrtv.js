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
   .directive('ngDraggable',function($document){
	   return {
		   restrict: 'A',
		   scope: {
			   dragOptions: '=ngDraggable'
			 , eqptList: '=taskData'
			 , $index: '=targetData'
		   },
		   link: function(scope, element, attr) {
			   var startX, startY, x = 0, y = 0,
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
			      }
			    }
			  }
   });

    

