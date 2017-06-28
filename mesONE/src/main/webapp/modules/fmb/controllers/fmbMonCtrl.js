/**  
 * @Class Name : fmb006Ctrl.js
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
    						  /*, 'CmmFactSrvc'  공장선택*/
    							, '$http'
    							, '$scope'
    							, '$window'
    							, '$q'
    							, '$filter'
    							
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
/*    	getSelectedPlc();
    	
    	function getSelectedPlc(){
    		
    		var promise = CmmAjaxService.select("/mes/bas/selectFmbPlc.do", self.plcSelectedVo);
            promise.then(function(data){
            	self.plc = data;//fmbPlcVo가 담긴 리스트 형태리턴
            }
            ,function(data){
            	alert('fail: '+ data)
            });
        	
        	 self.showModal = !self.showModal;
        };*/
        
    	}
        
    
    getPlcList();
    getEqptList();
    
    
    //설비plc 데이터 불러오기 Web Worker시작 함수
    Worker2Start();
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

		
		
		 //설비plc 데이터 불러오기 Web Worker시작 함수
	    function Worker2Start(){

	       //브라우저가 웹 워커를 지원하는지 검사한다 .
	        if(!!window.Worker){    
	           
	           //워커가 이미 존재하면 종료시킨다 .
	           if(workerList.worker2!=undefined){
	        	   workerList.worker2.terminate();
	        	   workerList.worker2=undefined;
	           }      
	           
	           //새로운 워커(객체)를 생성한다.
	           workerList.worker2= new Worker("worker2.js");       
	           
	           //Setting 정보를 Worker로 넘긴다.
	           workerList.worker2.postMessage(workerList.worker2data);
	           
	           // 워커로부터 전달되는 메시지를 받는다.
	           		workerList.worker2.onmessage = function(evt){ 
	           		/*self.eqptParamVo.factId = CmmFactSrvc.getSelectedFactId();
	           		self.plcParamVo.factId = CmmFactSrvc.getSelectedFactId();*/

	           		//설비이미지리스트 가져오기
	           		getEqptList();
	           		
	           		getPlcList();
	           		
	             }  
	        }
	        else {
	          alert("현재 브라우저는 웹 워커를 지원하지 않습니다");
	        }
	      }
}]);

