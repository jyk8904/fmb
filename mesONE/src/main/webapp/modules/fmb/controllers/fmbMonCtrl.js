/**  
 * @Class Name : fmbCh006Ctrl.js
 * @Description : fmb006 
 * @Modification Information  
 * @
 * @ 작업일       작성자      내용
 * @ ----------  ---------  -------------------------------
 * @ 2017.05.29  정유경    최초생성
 * @ 
 * 
 */

'use strict';

angular
    .module('app')
    .controller('FmbMonCtrl', [  'CmmAjaxService'
    							,'CmmModalSrvc'
    							,'CmmWorkerSrvc'
    							, '$rootScope'
    						  /*, 'CmmFactSrvc'  공장선택*/
    							, '$http'
    							, '$scope'
    							, '$window'
    							, '$q'
    							, '$filter'
    							, '$location'
    							
    							, function (
    									  CmmAjaxService
    									, CmmModalSrvc
    									, CmmWorkerSrvc
    									, $rootScope
    								  /*, CmmFactSrvc*/
    									, $http
    									, $scope
    									, $window
    									, $q
    									, $filter
    									, $location
    									) 
{
	/*------------------------------------------
     * 변수 선언
     *-----------------------------------------*/
    var self = this;
    var workerList = CmmWorkerSrvc;
    
    //설비parameter
    self.eqptParamVo = {};
    //elf.eqptParamVo.factId = CmmFactSrvc.getSelectedFactId() ;
    self.eqptParamVo.factId = 'B';
    self.eqptParamVo.plcId = '';
    self.eqptParamVo.eqptCnm ='';
    	
	//plc parameter
	self.plcParamVo={};
	self.plcParamVo.plcId ='';
	self.plcParamVo.factId ='B';
	//self.plcParamVo.factId = CmmFactSrvc.getSelectedFactId() ;
	
	self.stsData = {};
	self.BgList = {
	    factId: 'B'
	};
	$scope.eachBg = {
	    A: ''
	 	, B: ''
	 	, C: ''
	 	, Comd: ''
	};
	
    self.showModal = false;
	    
    self.toggleModal = function(pid){
    	self.plcSelectedVo = {plcId: pid,
					    		  factId: ''
					    		  } 
	
    	/*    	//상위컨트롤러에서 전송한 이벤트를 받음
    	 $scope.$on("event:changeFact",function (event, data){
    		self.eqptParamVo.factId  = data.selectedFactId;
    		self.plcParamVo.factId = d.selectedFactId;
    	 })

    	*/
    	//선택된 plc 데이터 가져오기
    	getSelectedPlc();
    	
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
        
    	}
            
    getPlcList();
    getEqptList();
    getBgImageList();

    function getBgImageList() {

        var bgImagePromise = CmmAjaxService.select("/mes/bas/selectFmbBgImage.do", self.BgList);
        bgImagePromise.then(function (data) {
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
        }, function (data) {
            alert('fail:' + data)
        });
    }

	//워커 스타트
	workerList.workerStart(workerList.worker2, "worker2.js", getData);
  //설비 이미지리스트 가져오기
    
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
		
		function getData(){
			getEqptList();
	   		getPlcList();
		} 		

		
    	
}]);

