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
    .controller('FmbModeCtrl', ['CmmAjaxService','CmmWorkerSrvc','CmmFactSrvc', '$http', '$scope','$mdSidenav', '$filter','$window','$mdDialog', '$timeout', function (CmmAjaxService, CmmWorkerSrvc, CmmFactSrvc, $http, $scope, $mdSidenav, $filter, $window, $mdDialog, $timeout) 
{
/*----------------------------------------------------------------
*  변수 선언
* ----------------------------------------------------------------
*  @ 설명
*  
*---------------------------------------------------------------*/
    
     var worker= undefined;
     var self = this;
     
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
     self.selected = {};
     self.pointer = {
    		  display : 'none'
     		, top : '0px'
     		, left : '0px'
     };
     $scope.plctext = {};
     $scope.crtEqpt = {};
     
     self.configSetting = {
    		 index : null
     };
     
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
 	
    self.BgList = {
    		   factId: '' 
    };
    $scope.eachBg = {
          A : ''
    	, B : ''
    	, C : ''
    	, Comd : ''
    };
 	self.opacityData = 100;
 
/*----------------------------------------------------------------
*  함수 실행
* ---------------------------------------------------------------- 
*  @ 설명
*  brbr - brbrbrbr~~
*  brbr - brbrbr~~~~
*---------------------------------------------------------------*/ 	
 	
 	getBgImageList();
 	
 	
 	
/*----------------------------------------------------------------
*  이벤트 함수 맵핑
* ---------------------------------------------------------------- 
*  @ 설명
*  brbr - brbrbrbr~~
*  brbr - brbrbr~~~~
*---------------------------------------------------------------*/ 	
 	
    self.changeFact = changeFact;
     
    self.deleteDiv = function (index) {
    	console.log(index)
    	self.eqptList[index].status = "delete";
    }

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
			    				self.setSelectedData(i);
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
    
    function getBgImageList() {
        
    	var bgImagePromise = CmmAjaxService.select("/mes/bas/selectFmbBgImage.do", self.BgList);
    	bgImagePromise.then(function(data) {
    		self.bgImageList = data;
    		
        	for (var i = 0; i < self.bgImageList.length; i++) {
        		var factId = self.bgImageList[i].factId;
        		
        		if (factId == "A") {
        			console.log($scope.eachBg.A)
        			$scope.eachBg.A = self.bgImageList[i].imgPath;
        			console.log($scope.eachBg.A)
        		} else if (factId == "B") {
        			$scope.eachBg.B = self.bgImageList[i].imgPath;
        		} else if (factId == "C") {
        			$scope.eachBg.C = self.bgImageList[i].imgPath;
        		} else if (factId == "Comb") {
        			$scope.eachBg.Comb = self.bgImageList[i].imgPath;
        		}
       		
        	}
    	}, function(data) {
    		alert('fail:' + data)
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
        	 self.pointer.animateTrigger = 'off';
        	 self.pointer.display = 'none';
        	 self.selected = {};
        	 self.configSetting = {};
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

     	self.plcParamVo.factId= factId ;

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
    	 self.selected = index;
    	 self.pointer.top = self.eqptList[index].cssTop;
    	 self.pointer.left = self.eqptList[index].cssLeft;
    	 self.pointer.animateTrigger = 'on';
    	 self.pointer.display = 'block';

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
     
     self.FindImg = function(factId) {
    	 console.log("보내는쪽 팩트아이디" + factId);
	        $mdDialog.show({
		          controller: 'ImageViewerCtrl',
		          controllerAs: 'vm',
		          templateUrl: '/mes/modules/fmb/views/imageViewer.tmpl.html',
		          parent: angular.element(document.body),
		          clickOutsideToClose:true,
		          locals : {
		        	  factId : factId
		          },
		          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
		        })
		        .then(function(answer) {
		          $scope.status = 'You said the information was "' + answer + '".';
		        }, function() {
		          $scope.status = 'You cancelled the dialog.';
		        });
     };
     
 
    /*------------------------------------------
     *  EQPT Data Commit
     *-----------------------------------------*/
    function saveEqptData() {
    	console.log(self.eqptList);
    }
    
}]);
