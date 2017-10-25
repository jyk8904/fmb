/**  
 * @Class Name : cmmFormDrtv.js
 * @Description : 공통 코드 관리
 * @Modification Information  
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017.03.02  kb.shin     최초생성
 * @ 2017.03.03  hc.kang     수정
 * @ 2017.05.24  kb.shin     달련 및 콤보 Directive 추가
 * 
 * @author kb.shin
 * @since 2017.03.02
 * @version 1.0
 * @see
 * 
 *  Copyright (C) by Brit Consortium All right reserved.
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
    /*
    .directive('krInput', ['$parse', function($parse) {   
		return {
            priority : 2,
            restrict : 'A',
            compile : function(element) {
                element.on('compositionupdate', function(e) {
                	element.triggerHandler('compositionend');
                	//e.stopImmediatePropagation();
                });
            },
		}
    }])
    */
        
   .directive('dvBtn', function() {   /* */
    	return {
    		restrict: 'E',
    		scope : {
    			title :'@title',
    			src : '@src'
    		},
    		transclude: true,  
    		replace:true,
    		template: "<div class='dvBtn'>" +
    					"<a href='#'><img title={{title}} src={{src}} style/></a>" +
    					"</div>"
    	}
    })
    
    .directive('bcColorDivision', function() {   /* 폼상단 컬러별 상태 구분 */
    	return {
    		restrict: 'E',
    		transclude: true,  
    		replace:true,
    		template: "<div class='color' ng-transclude></div>"
    	}
    })
    .directive('bcColor', function() {   /* 폼상단 컬러구분 */
    	return {
    		restrict: 'E',
    		scope : {
    			color:'@color',
    			txt:'@txt'
			},
    		transclude: true, 
    		template: "<div class='txt'><p class='{{color}} colors'></p>{{txt}}</div>"
    	}
    }) 
   .directive('bcLineView', function() {   /* 폼상단 라인구분 */
    	return {
    		restrict: 'E',	
    		transclude: true, 
    		template: "<div class='line_view' ng-transclude></div>"
    	}
    	
    })       
   .directive('bcLine', function() {   /* 폼상단 라인 */
    	return {
    		restrict: 'E',	
    		scope : {
    			line:'@line',
    			selected:'@selected'
			},
    		transclude: true, 
    		template: "<div class='{{line}} {{selected}} line'></div>"
    	}
    	
    })
   /*.directive('bcBackPanel', function() {    폼 백그라운드 패널 
    	return {
    		restrict: 'E',	
      		transclude: true, 
      		replace:true,
    		template: "<div bg-ctrl class='background-panel' ng-transclude></div>"
    	}
    	
    })*/
    .directive('bcBackPanel2', function() {   /* 폼 백그라운드 패널 */
    	return {
    		restrict: 'E',	
      		transclude: true, 
      		replace:true,
    		/*template: "<div bg-ctrl class='background-panel col-md-8' ng-transclude style='margin-top:20px; padding: 0 10px 0 10px; !important;'></div>"*/
      		template: "<div class='col-md-12 col-sm-12 col-xs-12' ng-transclude style='padding:0'></div>"
    	}
    	
    })  
    .directive('bcBgImgPanel', function() {   /* 폼 백그라운드 패널 */
    	return {
    		restrict: 'E',	
      		transclude: true, 
      		replace:true,
    		template: "<div bg-ctrl class='bg-img-panel' ng-transclude></div>"
    	}
    	
    })
   .directive('bcBackPanelLine', function() {   /* 폼 백그라운드 패널 상세 */
    	return {
    		restrict: 'E',	
    		scope : {
    			panelline:'@panelline',
    			txt:'@txt'
			},
			replace:true,
    		transclude: true, 
    		template: "<div class='backPanelLine {{panelline}}'>{{txt}}</div>"
    	}
    })
    


/******************************************디렉티브*********************************************/    
      
    .directive('bcFormHeader', function() {   /* 폼 상단의 타이틀 및 버튼 부분 */
    	return {
    		restrict: 'E',
    		scope: {
    			title : '@title',
    			isMobile : '='
    		},
    		replace:true,
    		transclude: true,  
    		template: "<div test-ctrl2 class='titleHeader col-md-12 col-sm-12 col-xs-12'>" +
	    				'<img ng-if="!isMobile" class ="col-lg-1 col-md-2 col-sm-2 col-xs-2" style="padding:1.8%;"src="assets/img/system/logo.png" />' +
    					'<img ng-if="isMobile" class ="col-lg-1 col-md-1 col-sm-1 col-xs-2" ng-click="onSwipeRight()" src="assets/img/system/logo.png" />' +
    					
    					'<div  ng-if="!isMobile" class="col-md-4 col-sm-5 col-xs-5 col-lg-offset-1"><h1 class="title" style="color: white; font-family:noteSansBlack; font-size:40px;;">{{title}}</h1></div>'+
    					'<div ng-if="isMobile" class="col-md-4 col-sm-4 col-xs-5 col-lg-offset-2"><h4 class="title" style="color: white;">{{title}}</h4></div>'+

    					"<div class='col-lg-6 col-md-6 col-sm-7 col-xs-7' style='font-size:18px; padding:10px' ng-transclude></div>"	+
    				  
    					"</div>",
    				 /* col-lg-offset-1*/
    		controller: function($scope, $attrs, $log, $mdSidenav) {
    			$scope.onSwipeRight = function() {    
    			    $mdSidenav('left1').open();
    			}
    		}
    	}
    })
    
    .directive('bcFormBody', function() {  /* 폼의 주요 Contents 부분. 테이블이 없을 경우만 사용  */
    	return {
    		restrict: 'E',
    		transclude: true,  
    		template: "<div class='col-md-12 col-sm-12 col-xs-12' ng-transclude style='padding:0;'></div>"
    	}
    })    
    .directive('bcFormFooter', function() {  /* 폼의 하단부 상태 표시 부분 */
    	return {
    		restrict: 'E',
    		transclude: true,  
    		template: "<div ng-transclude></div>"
    	}
    })
     .directive('bcLegend', function() {  /* 헤더 우측 내용 */
    	return {
    		restrict: 'E',
    		transclude: true,  
    		template: "<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12' style='margin-top:50px;'" +
    				  "<div ng-if='!isMobile' class='lineInfo' ng-transclude></div>"+
    				  "<div ng-if='isMobile' class='lineInfoMobile' ng-transclude></div>"+
	    				"</div>"
    	}
    })

/*    .directive('bcHeaderLabel', function() {   폼 좌측 상단 타이틀 
    	return {
    		require:'^bcFormHeader',
    		scope: {
    			title : '@title'
    		},
    		template: "<label class='col-sm-4 bc-header-label'>{{title}}</label>"
    	}
    })*/
/*    .directive('bcHeaderLabel', function() {   폼 좌측 상단 타이틀 
    	return {
    		require:'^bcFormHeader',
    		scope: {
    			title : '@title'
    		},
    		template: "<label class='col-sm-4 bc-header-label'>{{title}}</label>"
    	}
    })*/

     .directive('bcButton', function() {  /* 버튼 */
    	return {
    		scope: {
    			title : '@title',
    			icon : '@icon'
    		},
    		template: "<button type='button' class='btn btn-primary btn-sm'><i class={{icon}}></i>{{title}}</button>"
    	}
    })
    .directive('bcInput', function() {  /* 입력 에디터 */
    	return {
    		scope: {
    			labelText: '@labeltext',
    			inputValue: '=ngModel'
    		},
    		template: "<div class='form-horizontal'><div class='form-group'><label class='col-sm-3 control-label'>{{labelText}}</label><div class='col-sm-6 control-label'><input type='text' class='form-control input-sm' ng-model='inputValue' bc-capitalize/></div></div></div>"
        	//	template: "<div class='form-horizontal'><div class='form-group'><label class='col-sm-2 control-label'>{{labelText}}</label><div class='col-sm-8'><input type='text' class='form-control input-sm' ng-model='inputValue' bc-capitalize/></div></div></div>"
    		//template: "<div class='form-horizontal'><div class='form-group'><label control-label'>{{labelText}}</label><div>  <input type='text' class='form-control input-sm' ng-model='inputValue' bc-capitalize/></div></div></div>"
    	}
    })
    .directive('bcCapitalize', function() {	/* 입력 시 대문자로 자동변환 */
		return {
			require: 'ngModel',
			link: function(scope, element, attrs, modelCtrl) {
				var capitalize = function(inputValue) {
					if (inputValue == undefined) inputValue = '';
					var capitalized = inputValue.toUpperCase();
					if (capitalized !== inputValue) {
						modelCtrl.$setViewValue(capitalized);
						modelCtrl.$render();
					}
					return capitalized;
				}
				modelCtrl.$parsers.push(capitalize);
				capitalize(scope[attrs.ngModel]); // capitalize initial value
			}
		}
	})
    
    /*모달창*/
    .directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
		          '<div class="modal-dialog">' + 
		            '<div class="modal-content">' + 
		              '<div class="modal-header">' + 
		                /*'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + */
		                '<h4 class="modal-title">{{ title }}</h4>' + 
		              '</div>' + 
		              '<div class="modal-body" ng-transclude></div>' + 
		            '</div>' + 
		          '</div>' + 
		        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });


