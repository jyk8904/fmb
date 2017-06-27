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
    .controller('Fmb006Ctrl', ['CmmAjaxService','CmmModalSrvc','CmmWorkerSrvc', '$http', '$scope', '$window','$q', function (CmmAjaxService, CmmWorkerSrvc, $http, $scope, $window, $q) 
{
	/*------------------------------------------
     * 변수 선언
     *-----------------------------------------*/
    var self = this;
    var workerList = CmmWorkerSrvc;
    //설비parameter
    self.eqptParamVo = {
    		factId: 'C',
			plcId: '', 
    		eqptCnm: ''
        }
    
    //plc parameter
    self.plcParamVo = {
        	plcId: '', 
        	factId: 'C'
        }
    

    self.showModal = false;
    
    self.toggleModal = function(pid){
    	self.plcSelectedVo = {plcId: pid,
				    		  factId: ''
				    		  } 
   	    	
    	//선택된 plc 데이터 가져오기
        var promise = CmmAjaxService.select("/mes/bas/selectFmbPlc.do", self.plcSelectedVo);
        promise.then(function(data){
        	self.plc = data;//fmbPlcVo가 담긴 리스트 형태리턴
        }
        ,function(data){
        	alert('fail: '+ data)
        });
    	
    	 self.showModal = !self.showModal;
    };
    Worker2Start();
    
/*    //설비 plc 알람데이터 가져오기
    	var eqptPromise = CmmAjaxService.select("/mes/bas/selectFmbPlc.do", self.plcParamVo);
    	self.alarmList = {}
    	eqptPromise.then(function(data) {
    		
    		self.plcList = data; //fmbplcVo가 담긴 리스트 형태리턴
    		for (var i = 0; i < data.length; i++) {
    			if(data[i].eqptSts=='0'){ //sts== 4일경우 하단바에 알람 발생 경고()
    				self.alarmList[i]=data[i];
    			}
    		}
    		
    	}, function(data){
    		alert('fail: '+ data)
    });*/
    	//공장의 모든 plc리스트 가져오기
    	
/*    	self.plcList = ajaxGetData("/mes/bas/selectFmbPlc.do", self.plcVo);

    	*/
    	    	    	

    	
    
    //설비 이미지리스트 가져오기
    var eqptPromise = CmmAjaxService.select("/mes/bas/selectFmbEqpt.do", self.eqptParamVo);
    eqptPromise.then(function(data) {
    	self.eqptList = data; //fmbEqptVo가 담긴 리스트 형태리턴
    }, function(data){
    		alert('fail: '+ data)
    });
    
    
    
    
    
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
           workerList.worker2.postMessage(5);
           
           // 워커로부터 전달되는 메시지를 받는다.
           		workerList.worker2.onmessage = function(evt){ 
           	    //설비 plc 데이터 가져오기
               	var plcPromise = CmmAjaxService.select("/mes/bas/selectFmbPlc.do", self.plcParamVo);
               	self.alarmList = {}
               	plcPromise.then(function(data) {
               		
               		self.plcList = data; //fmbplcVo가 담긴 리스트 형태리턴
               		
               		
               		for (var i = 0; i < data.length; i++) {
               			if(data[i].eqptSts=='0'){ //sts== 4일경우 하단바에 알람 발생 경고()
               				self.alarmList[i]=data[i];
               			}
               		}
               		
               	}, function(data){
               		alert('fail: '+ data)
               });

             }  
        }
        else {
          alert("현재 브라우저는 웹 워커를 지원하지 않습니다");
        }
      }




}]);

