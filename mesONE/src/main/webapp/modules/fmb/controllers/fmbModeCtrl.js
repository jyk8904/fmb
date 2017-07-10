/**  
 * @Class Name : fmbModeCtrl.js
 * @Description : fmbMode 
 * @Modification Information  
 * @
 * @ 작업일       작성자      내용
 * @ ----------  ---------  -------------------------------
 * @ 2017.05.29  정유경       최초생성
 * @ 2017.06.19  jy CHO     수정
 * 
 */

'use strict';

angular
    .module('app')
    .controller('FmbModeCtrl', ['CmmAjaxService','CmmWorkerSrvc','CmmFactSrvc', '$http', '$scope','$mdSidenav', '$filter','$window','$mdDialog', function (CmmAjaxService, CmmWorkerSrvc, CmmFactSrvc, $http, $scope, $mdSidenav, $filter, $window, $mdDialog) 
{
/*----------------------------------------------------------------
*  변수 선언
* ----------------------------------------------------------------
*  @ 설명
*  
*---------------------------------------------------------------*/
    
     var worker= undefined;
     var self = this;
     var vm = this;
     
     $scope.hoverIn = function(){
    	 this.hover = true;
     }
     $scope.hoverOut = function(){
    	 this.hover = false;
     }

     //알람정보워커삭제
     var workerList = CmmWorkerSrvc;
     //workerList.worker3.terminate();
     workerList.worker3 = undefined;
     
     self.showModal = false;
     
     self.checkData = {};
     $scope.plctext = {};
     $scope.crtEqpt = {};
     self.configSetting = {};
     //설비parameter
     self.eqptParamVo = {
    		  factId: 'C'
		   	, plcId: ''
		   	, eqptCnm: ''
     };

 	//plc parameter
 	self.plcParamVo = {
 			  plcId: ''
 			, factId: 'C'
 	};
 	
 	self.opacityData = 100;
 	
/*----------------------------------------------------------------
*  이벤트 함수 맵핑
* ---------------------------------------------------------------- 
*  @ 설명
*  brbr - brbrbrbr~~
*  brbr - brbrbr~~~~
*---------------------------------------------------------------*/ 	
 	
    self.changeFact = changeFact;
     
    self.exists = function (eqpt, modStatus, index) {
    	if (modStatus == true) {
    	 	eqpt.status = "delete";
    	}
    };

    self.toggleLeft = buildToggler('left');

    $scope.$watch('vm.eqptList', function(newVal, oldVal) {
    	
    	if (newVal != null && oldVal != null)
    	{
	    	if(newVal.length > 0 && oldVal.length > 0) {
		    	newVal.forEach(function (obj, i) {
		    		
		    		Object.keys(obj).forEach(function(f){
		    			
		    			if (f != '$$hashKey') {
		    				
			    			var detNewVal = obj[f];
			    			var detOldVal = oldVal[i][f];
			    			
			    			if (detNewVal !== detOldVal) {
			    				var updateIndex = i;
			    				if (self.eqptList[i].status == 'keep') {
			    					self.eqptList[i].status = 'update';
			    				}
			    			}
		    			}
		    		});
		    	});
	    	}
    	}
    }, true);

    self.crtEqptModal = function(){
    	var classList = $filter('orderBy')(self.eqptList,'eqptCnm');
    	
    	var latestNum = classList[classList.length - 1].eqptCnm.split('eqpt')[1];
    	
    	$scope.crtEqpt.cnm = 'eqpt' + leadingZeros(parseInt(latestNum) + 1, 3);
    	
    	self.showModal = !self.showModal;
    };
    
    function leadingZeros(n, digits) {
    	var zero = '';
    	n = n.toString();
    	
    	if (n.length < digits) {
    		for (var i = 0; i < digits - n.length; i++)
    			zero += '0';
    	}
    	
    	return zero + n;
    }
    
    $scope.submit = function(){	
    	var cnm = $scope.crtEqpt.cnm;
    	var type = $scope.crtEqpt.type;
    	var plcId = $scope.crtEqpt.plcId;
    	console.log(cnm,type,plcId)
    	if (cnm != null && cnm != "" && type != null && type != "" && plcId != null && plcId != "")
    	{
    		var detect = $filter('filter')(self.eqptList, {plcId : plcId , status : '!delete'});
    		console.log(detect);
		    /*	var data = {  eqptCnm : cnm
		    			    , plcId : plcId
		    			    , eqptType : type
		    			    , desc : null
		    			    , cssZindex : 'auto'
		    			    , cssWidth : '0px'
		    				, cssHeight : '0px'
		    				, cssTop : '0px'
		    				, cssLeft : '0px'
		    				, status : 'insert'
		    			   };
		    	
		    	self.eqptList.push(data);*/
    	}
    	else {
    		console.log(cnm,type,plcId)
    		alert("모든 칸을 기입해야합니다.");
    	}
    };
    
    self.saveEqptData = function(){
    	 console.log("저장하는시점 factId는? "+self.eqptParamVo.factId );
    	 var eqptPromise = CmmAjaxService.save("/mes/bas/saveFmbEqpt.do", self.eqptList);
    };
    
    //설비 이미지리스트 가져오기
    function getEqptList(){
    	var eqptPromise = CmmAjaxService.select("/mes/bas/selectFmbEqpt.do", self.eqptParamVo);
    	eqptPromise.then(function(data) {
    		self.eqptList = data; //fmbEqptVo가 담긴 리스트 형태리턴
    		for(var i = 0; i < self.eqptList.length; i++){
    			self.eqptList[i]['status'] = "keep";
    		}
    	}, function(data){
    	alert('fail: '+ data)
    });    	
    
    }
    
    function getPlcList(){
    	
    	//설비 plc 데이터 가져오기
    	var plcPromise = CmmAjaxService.select("/mes/bas/selectFmbPlc.do", self.plcParamVo);
    	plcPromise.then(function(data) {
    		self.plcList = data; //fmbplcVo가 담긴 리스트 형태리턴
    	}, function(data){
    		alert('fail: '+ data)
    	});
    }
    
    
/*----------------------------------------------------------------
*  이벤트 함수 정의
* ----------------------------------------------------------------
* @ 설명
* 
*----------------------------------------------------------------*/
    
     function buildToggler(componentId) {
         return function() {
           $mdSidenav(componentId).toggle();
         };
     }
     
     function Fmb007Ctrl ( $scope ) {
    	 $scope.data = {
    			   selectedIndex: 0
    			 , bottom: false
    	 };
    	 $scope.next = function() {
    	      $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2) ;
    	 };
    	 $scope.previous = function() {
    	      $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
    	 };
    }
    
    //배경이미지 변경하기
  	//설비리스트 다시불러오기
    function changeFact(){
     	
    	getEqptList();
     	getPlcList();
     	
     	var factId = self.eqptParamVo.factId;
     	
     	if (factId == 'Comb'){
     		self.plcParamVo.factId = "";
     	} else {
     		self.plcParamVo.factId= factId ;
     	}
    }
    
    
/*----------------------------------------------------------------
*  함수 실행
* ----------------------------------------------------------------
* @ 설명
* 
*----------------------------------------------------------------*/ 
    
    getEqptList();
    getPlcList();
     
    /*------------------------------------------
    *  Config Setting Data
    *-----------------------------------------*/ 
     
     // 선택한 요소에 대한 css 및 기본정보(클래스명, 정의된 타입, Id)값을 불러온다.
     // 탭칸에 요소들을 추가시킴.
     self.setSelectedData = function setSelectedData(index){
    	 self.configSetting.index = index;
     }
     
     // 설정한 요소들에 대하여 실제 HTML에 적용 시킨다.
     // 각각의 요소에 대하여 알맞은 데이터를 바인딩 시킨다.
     // Jquery 적인 요소로 코딩을 적용하였음.  --> 더 좋은 방법이 있다면 변경해야 함.
     self.saveConfig = function (eqpt) {
    	
    	 var cnm = eqpt['cnm'];
    	 var target = $filter('filter')(self.eqptList, {eqptCnm : cnm});
    	 target[0]['eqptCnm'] = $scope.configSetting.cnm;
    	 target[0]['eqptType'] = $scope.configSetting.type;
    	 target[0]['plcId'] = $scope.configSetting.plcId;
    	 target[0]['cssTop'] = $scope.configSetting.top;
    	 target[0]['cssLeft'] = $scope.configSetting.left;
    	 target[0]['cssHeight'] = $scope.configSetting.height;
    	 target[0]['cssWidth'] = $scope.configSetting.width;
    	 target[0]['stsImg0'] = $scope.configSetting.imgUrl;
    	 if (target[0]['status'] != 'delete' && target[0]['status'] != 'insert')
    	 {
    		 target[0]['status'] = "update";
    	 }
    	 
    	 alert("적용 되었습니다.");
     }
     
     var customFullscreen = false;
     
     self.uploadImg = function() {
	        $mdDialog.show({
		          controller: 'UploadCtrl',
		          controllerAs: 'vm',
		          templateUrl: '/mes/modules/fmb/views/upload.tmpl.html',
		          parent: angular.element(document.body),
		          clickOutsideToClose:true,
		          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
		        })
		        .then(function(answer) {
		          $scope.status = 'You said the information was "' + answer + '".';
		        }, function() {
		          $scope.status = 'You cancelled the dialog.';
		        });
     };
     
     self.FindImg = function() {
    	 console.log("22222")
	        $mdDialog.show({
		          controller: 'ImageViewerCtrl',
		          controllerAs: 'vm',
		          templateUrl: '/mes/modules/fmb/views/imageViewer.tmpl.html',
		          parent: angular.element(document.body),
		          clickOutsideToClose:true,
		          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
		        })
		        .then(function(answer) {
		          $scope.status = 'You said the information was "' + answer + '".';
		        }, function() {
		          $scope.status = 'You cancelled the dialog.';
		        });
    	 console.log('123')
     };
     
     
    /*------------------------------------------
    *  Responsive Setting Part
    *-----------------------------------------
     angular.element(document).ready(function(){
    	 
    	 var default_width = 1920;
    	 var default_height = 1080;
    	    
    	 var screen_width = $(window).width();
    	 var screen_height = $(window).height();
    	    
    	 console.log(screen_width, screen_height);
    	    
    	 // 현재 개념 ..
    	 // 모바일일경우 강제 화면 전환이 될경우가 제일 좋을것으로 예상되며,
    	 // 필요 조건(ex - 16:9 종횡 비율이 아닐경우)
    	 // 페이지를 보여주지 않고 화면 전환 할경우에만 보여줄 것을 권장하는 방법으로 생각중.
    	 // 폰 디바이스 일 경우, width와 height를 서로 swap 하여 계산한다.
    	 if (navigator.userAgent.match(/Mobile|iP(hone|od)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)) {

    	     // 스마트폰일 때 실행 될 스크립트
  	        // mobile용 코딩//
  	        var swap = "";
   	        swap = screen_width;
   	        screen_width = screen_height;		
   	        screen_height = swap;

   	    }
    
    	// 화면 비율 구하는 공식
    	// 기본 16:9 비율의 화면에서는 소수점이 없으나 일반 4:3 모니터의 경우 편의를 위해 소수점을 두자리까지 고정 시켜준다.
    	// 대형 화면 기준으로 실제 와이드 화면으로 셋팅 될 경우 공식 자체를 변환해주어야함.
    	// 너비의 비율을 너비와 높이에 곱해줘야 동일한 가로세로비율을 유지할수 있음

    	var screen_rate = (screen_width / default_width);
    	console.log(screen_rate);
    	//screen_rate = Math.floor(screen_rate, 2);
   
    	document.getElementsByClassName("md-screen").width= document.getElementsByClassName("md-screen")[0].offsetWidth * screen_rate;
    	
    	// 실제 영역에 대하여 비율 축소를 적용하는 Part
    	// 비율은 무조건 16:9로 고정하며 빈공간의 예외상황은 고려하지 않는다.
    	
     });*/
 
    /*------------------------------------------
     *  EQPT Data Commit
     *-----------------------------------------*/
    function saveEqptData() {
    	console.log(self.eqptList);
    }
    
}]);
