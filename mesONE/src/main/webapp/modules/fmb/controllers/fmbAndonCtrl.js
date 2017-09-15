/**  
 * @Class Name : fmbAndon.js
 * @Description : fmbAndon.html 
 * @Modification Information  
 * @ 안돈신호 모니터링 임시페이지
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
    
    $scope.isMobile = false;
    //설비parameter
    self.eqptParamVo = {};
    self.eqptParamVo.factId = 'Comb';
	self.eqptParamVo.eqptType='ANDON';
    self.eqptParamVo.id ='';
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
    
    // 모바일 체크 함수 실행
	isMobileFunc();
    getBgImageList();
    getAndonData();
    dataChk();
    
    function dataChk(){ //function(getplcList, getEqptList, bindData) 순서제어

      	    if(self.preplcList==undefined || self.preeqptList==undefined){//모든 데이터를 읽지 못했을경우
   	    	$timeout(function(){
/*	   	    	console.log(self.plcList==undefined, self.plcList)
			   	console.log(self.eqptList==undefined, self.eqptList)*/
   	    	}, 100)
   	    	.then(function(){
   	    		dataChk();
   	    	});
		 
   		}else{ 																//모든 데이터를 읽어들인 경우
   			bindData();
   		}
   	}

    
    // 모바일 체크 함수 정의
	function isMobileFunc(){
		var UserAgent = navigator.userAgent;

		if (UserAgent.match(/iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null)
		{
			$scope.isMobile = true;
		}else{
			$scope.isMobile =  false;
		}
		console.log($scope.isMobile)
	}
	
	//설비 plc 데이터 가져오기
    function getPlcList(){
   	   		var plcPromise = CmmAjaxService.select("/mes/bas/selectFmbPlc.do", self.plcParamVo);
           	plcPromise.then(function(data) {
           		//랜덤값 입력
           		/*	for(var i = 0; i< data.length; i++){
               		var random = Math.floor(Math.random()*3);
               		if(random==0){
               			random = 4;
               		}
               		data[i].eqptSts = random;
           			}*/
           		
           			//데이터를 가져오는동안 깜빡임 방지
           			self.preplcList = data;
           			self.plcList = self.preplcList;
           			//fmbplcVo가 담긴 리스트 형태리턴
           		
           	}, function(data){
           		/*alert('fail: '+ data)*/
           		console.log('fail: '+ data);
           });
   		}

    //설비 이미지리스트 가져오기
    function getEqptList(){
	    	var eqptPromise = CmmAjaxService.select("/mes/bas/selectFmbEqpt.do", self.eqptParamVo);
	    	eqptPromise.then(function(data) {
	    		self.preeqptList = data;
	    		self.eqptList = self.preeqptList;
	    	}, function(data){
	    		/*alert('fail: '+ data)*/
	    		console.log('fail'+data);
	    	});
	}
    //plc, eqpt list 바인딩
	function bindData(){
		for(var i =0; i < self.eqptList.length; i++){
			var target = $filter('filter')(self.plcList, {plcId : self.eqptList[i].id});
			self.stsData[i]= target[0].eqptSts;
			/*self.stsData[i]= target[0];*/	//plc리스트에서 상태값 뿐만ㅇㅏ니라 다른 데이터도 연동시킬때 사용
		}
	};
	
	//해당 동의 배경이미지가져오기 
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
    		/*alert('fail:' + data)*/
    		console.log('fail: '+ data);
    	});
    }
    
    //선택된 plc에 대한 정보 가져오기
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

    
    function getAndonData(){
    	self.preeqptList=undefined;
    	self.preplcList=undefined;
    	getEqptList();
   		getPlcList();
     }     
    	//워커 스타트
    	workerList.workerStart(workerList.worker2, "worker.js");
    	
    	//워커 온메세지
    	workerList.workerOnmessage(workerList.worker2, function(){getAndonData(); dataChk();});

	    // 팝업 테스트용 코드입니다....
	    var customFullscreen = false;
	    
	    $scope.cancel = function() {
	    	$mdDialog.hide();
	    };
	    
	    //설비버튼 클릭시, 팝업창 open
	    $scope.showAdvanced = function(id, ev) {
	    	
	    	CmmFactSrvc.setPlcData(id);
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

