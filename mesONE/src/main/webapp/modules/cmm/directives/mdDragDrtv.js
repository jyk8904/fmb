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
/* 디렉티브 생성방법
 * 1. restrict 옵션
restrict : 'E' //element <my-example>
restrict : 'A' //attribute <div my-example>
restrict : 'C' //class <div class=my-example>
restrict : 'M' //comment <!--my-example-->
2. template
디렉티브를 사용한 부분에 보여줄 내용(html코드) ,
template내용이 많은 경우 templateUrl 옵션으로 변경하여 사용 권장
3. templateUrl
url에 해당하는html을 로드함, index.htm위치를 기준으로 상대위지 정의
4. replace
디렉티브를 사용한 html 태그에 template 혹은 templateUrl을 추가(true)/교체(false)  
5. priority
디렉티브별 compile()과 link() 호출 우선 순위 지정 (클수록 우선순위가 높다)
6. transclude
template 혹은 templatUrl에서 디렉티브 내의 원본내용을 포함(true)/미포함(false)
7. scope
   디렉티브의 scope 설정
   false: 새로운 scope객체 생성하지 않음, 부모 scope 객체 공유(default)
   true : tofhdns scope객체 생성, 부모 scope 객체 상속
   = : 부모scope
   @:디렉티브의 attibute value를 {{}}방식을 이용하여 부모 scope 접근(변수를 지정가능)
   ='...':ng-model공유
8. controller
다른 디렉티브들과 통신하기 위한 역할을 하는 controller
9. require
다른 컨트롤러나 디렉티브의 컨트롤러에 this로 정의된 function을 사용할때 선언
ex)require에 컨트롤러 이름을 설정하면 해당 컨트롤러를 주입받게 됨 
이후 디렉티브의 link()내에서 주입받은 컨트롤러의 this로 선언되 모든 function사용 가능
?를 디렉티브 앞에 추가시 매칭되는 디렉티브가 없어도 에러 발생 안함
^ 추가시 DOM 엘리먼트는 거슬러 올라가며 해당 디렉티브를 찾음

10.DOM 엘리먼트를 해석하여 디렉티브로 변환하며 두 종류의 link function을 리턴.
preLink() : compile phase가 실행되고 child 엘리먼트가 link 되기 전에 호출
postLink() : compile phase가 실행되고 child 엘리먼트가 link 된 후 호출 
( 따라서, DOM 구조를 변경하기 위해서는 postLink()를 이용. )
11. link() : 2-way data binding을 위해 해당 디렉티브 DOM엘리먼트의 event listener를 등록.
( 디렉티브의 대부분의 로직을 여기에 선언하며 postLink()만 지원.)
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
			        //ctrl.modStatus();
			        if (scope.eqptList[scope.$index].status == "keep")
			        {
			        	scope.eqptList[scope.$index].status = "update";
			        }
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

    

