/**  
 * @Class Name : fmbAndon.js
 * @Description : fmbAndon
 * @Modification Information  
 * @
 * @ 작업일       작성자      내용
 * @ ----------  ---------  -------------------------------
 * @ 2017.08.09  정유경    최초생성
 * @ 
 * 
 */

'use strict';

angular
    .module('app')
    .controller('FmbAndonCtrl', [ 'CmmAjaxService'
    							, 'CmmModalSrvc'
    							, 'CmmWorkerSrvc'
    							, 'CmmFactSrvc'
    							, '$rootScope'
    							, '$http'
    							, '$scope'
    							, '$window'
    							, '$q'
    							, '$filter'
    							, '$location'
    							, '$mdDialog'
    							, '$timeout'
    							, '$mdSidenav'
    							, function (
    									  CmmAjaxService
    									, CmmModalSrvc
    									, CmmWorkerSrvc
    									, CmmFactSrvc
    									, $rootScope
    									, $http
    									, $scope
    									, $window
    									, $q
    									, $filter
    									, $location
    									, $mdDialog
    									, $timeout
    									, $mdSidenav
    									) 
{
	/*------------------------------------------
     * 변수 선언
     *-----------------------------------------*/
    var self = this;
    var workerList = CmmWorkerSrvc;
    console.log(workerList);
    //설비parameter
    self.eqptParamVo = {};
    self.eqptParamVo.factId = 'Comb';
    self.eqptParamVo.plcId = '';
    self.eqptParamVo.eqptCnm ='';
    
	//plc parameter
	self.plcParamVo={};
	self.plcParamVo.plcId ='';
	self.plcParamVo.factId ='';
	
	self.stsData = {};
    self.BgList = {
 		   factId: 'Comb' 
    };
	 $scope.eachBg = {
	       A : ''
	 	, B : ''
	 	, C : ''
	 	, Comd : ''
	 };

    self.showModal = false;
    self.toggleModal = function(pid){
    	self.plcSelectedVo = {plcId: pid,
					    		  factId: ''
					    		  } 
    	//선택된 plc 데이터 가져오기
    	getSelectedPlc();
        
    }
    
    getBgImageList();
    getData();
    dataChk();
    
    function dataChk(){ //function(getplcList, getEqptList, bindData) 순서제어
   	    if(self.plcList==undefined || self.eqptList==undefined){//모든 데이터를 읽지 못했을경우
   	    	$timeout(function(){
	   	    	console.log(self.plcList==undefined, self.plcList)
			   	console.log(self.eqptList==undefined, self.eqptList)
   	    	}, 100)
   	    	.then(function(){
   	    		dataChk();
   	    	});
		 
   		}else{ 													//모든 데이터를 읽어들인 경우
   			bindData();
   		}
   	}

    
    function getPlcList(){
   		//설비 plc 데이터 가져오기
   	   		var plcPromise = CmmAjaxService.select("/mes/bas/selectFmbPlc.do", self.plcParamVo);
           	plcPromise.then(function(data) {
           		//랜덤값 입력
           			for(var i = 0; i< data.length; i++){
               		var random = Math.floor(Math.random()*3);
               		if(random==0){
               			random = 4;
               		}
               		data[i].eqptSts = random;
           			}
           			self.plcList = data; 
           			//fmbplcVo가 담긴 리스트 형태리턴
           		
           	}, function(data){
           		alert('fail: '+ data)
           });
   		}

    function getEqptList(){
	    	//설비 이미지리스트 가져오기 메소드
	    	var eqptPromise = CmmAjaxService.select("/mes/bas/selectFmbEqpt.do", self.eqptParamVo);
	    	eqptPromise.then(function(data) {
	    		self.eqptList = data;
	    	}, function(data){
	    		alert('fail: '+ data)
	    	});
	}

	function bindData(){
		for(var i =0; i < self.eqptList.length; i++){
			var target = $filter('filter')(self.plcList, {plcId : self.eqptList[i].plcId});
			self.stsData[i]= target[0].eqptSts;
		}
	};
	 
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
    
	function getSelectedPlc(){
		var promise = CmmAjaxService.select("/mes/bas/selectFmbPlc.do", self.plcSelectedVo);
        promise.then(function(data){
        	self.plc = data;//fmbPlcVo가 담긴 리스트 형태리턴
        }
        ,function(data){
        	alert('fail: '+ data)
        });
    	
    	 self.showModal = !self.showModal;
    };

    function getData(){
    	getEqptList();
   		getPlcList();
     }  
    
    	//워커 스타트
    	workerList.workerStart(workerList.worker2, "worker2.js", function(){getData(); dataChk();});
	
	    // 팝업 테스트용 코드입니다....
	    
	    var customFullscreen = false;
	    
	    $scope.cancel = function() {
	    	$mdDialog.hide();
	    };
	    
	    $scope.showAdvanced = function(ev) {
	    	
	    	CmmFactSrvc.setPlcData(ev);
	    	console.log(CmmFactSrvc.getPlcData());
	    	//PlC 데이터 저장 하는 부분.
	    	//CmmFactSrvc.setPlcData(ev);
	    	
	        $mdDialog.show({
	          controller: 'DialogCtrl',
	          controllerAs: 'vm',
	          templateUrl: '/mes/modules/fmb/views/dialog1.tmpl.html',
	          parent: angular.element(document.body),
	          targetEvent: ev,
	          clickOutsideToClose:true,
	          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
	        })
	        .then(function(answer) {
	          $scope.status = 'You said the information was "' + answer + '".';
	        }, function() {
	          $scope.status = 'You cancelled the dialog.';
	        });
	    };
}]);

