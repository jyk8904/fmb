/**  
 * @Class Name : fmbMainMon.js
 * @Description : fmbMainMon 
 * @Modification Information  
 * @ 
 * @ 작업일        작성자          내용
 * @ ----------  ------------  -------------------------------
 * @ 2017.06.29  정유경, 조준연    최초생성
 * @ 사용x
 * 
 */

'use strict';

angular
    .module('app')
    .controller('FmbMainMonCtrl', [  'CmmAjaxService'
    							,'CmmModalSrvc'
    							,'CmmWorkerSrvc'
    						  /*, 'CmmFactSrvc'  공장선택*/
    							, '$http'
    							, '$scope'
    							, '$window'
    							, '$q'
    							, '$filter'
    							, '$location'
    							, '$timeout'
    							, function (
    									  CmmAjaxService
    									, CmmModalSrvc
    									, CmmWorkerSrvc
    								  /*, CmmFactSrvc*/
    									, $http
    									, $scope
    									, $window
    									, $q
    									, $filter
    									, $location
    									, $timeout
    									) 
{
	/*------------------------------------------
     * 변수 선언
     *-----------------------------------------*/
	$scope.$watch('loginChk', function(newVal, oldVal) {
		if(newVal == false){
			$location.url('');
		}    	
	}, true);
						
    var self = this;
    var workerList = CmmWorkerSrvc;
    
    //설비parameter
    self.eqptParamVo = {};
    //elf.eqptParamVo.factId = CmmFactSrvc.getSelectedFactId() ;
    self.eqptParamVo.factId = 'comb';
    self.eqptParamVo.plcId = '';
    self.eqptParamVo.eqptCnm ='';
    	
	//plc parameter
	self.plcParamVo={};
	self.plcParamVo.plcId ='';
	self.plcParamVo.factId ='B';
	//self.plcParamVo.factId = CmmFactSrvc.getSelectedFactId() ;
	
	self.stsData = {};
	
	
    self.showModal = false;
	    
    self.toggleModal = function(pid){
    	self.plcSelectedVo = {plcId: pid,
					    		  factId: ''
					    		  } 
    	}
    getData();


	//워커 스타트
	workerList.workerStart(workerList.worker2, "worker2.js", getData);
   
    function getData(){
    	// 비동기실행에 따른 이벤트 순서 제어 
    	$timeout(getPlcList(), 200)
    	.then(function(){
    		getEqptList();
    	});
    }

    function getEqptList(){
	    	//설비 이미지리스트 가져오기 메소드
	    	var eqptPromise = CmmAjaxService.select("/mes/bas/selectFmbEqpt.do", self.eqptParamVo);
	    	eqptPromise.then(function(data) {
	    		self.eqptList = data; //fmbEqptVo가 담긴 리스트 형태리턴
	    		aaa();
	    		
	    	}, function(data){
	    		alert('fail: '+ data)
	    	});
    }
    
    
    function aaa(){
		for(var i =0; i < self.eqptList.length; i++){
			var target = $filter('filter')(self.plcList, {plcId : self.eqptList[i].plcId});
			self.stsData[i]= target[0].eqptSts;
		}
		//console.log(self.stsData[0])
	};
	function getPlcList(){
   		//설비 plc 데이터 가져오기
   	   		var plcPromise = CmmAjaxService.select("/mes/bas/selectFmbPlc.do", self.plcParamVo);
           	plcPromise.then(function(data) {
           		//랜덤값 입력
           		for(var i = 0; i< data.length; i++){
               		var random = Math.floor(Math.random()*5);
               		//console.log("random값"+random);
               		data[i].eqptSts = random;
               		//console.log("상태값"+data[i].eqptSts);
           		}
           		
           		self.plcList = data; //fmbplcVo가 담긴 리스트 형태리턴
           		
           	}, function(data){
           		alert('fail: '+ data)
           });
   	}
}]);

