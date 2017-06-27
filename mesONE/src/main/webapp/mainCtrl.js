/**
 * 
 */
'use strict';

angular
.module('app')
.controller('MainCtrl', ['$http'
                       , '$scope'
                       , 'CmmAjaxService'
                       , 'CmmWorkerSrvc'
                       , '$location'
                       , '$timeout'
                       , '$q'
                       , '$interval'
                       ,  function ($http
                                 , $scope
                                 , CmmAjaxService
                                 , CmmWorkerSrvc
                                 , $location
                                 , $timeout
                                 , $q
                                 , $interval) {

 
   var i = 1;
   var workerList = CmmWorkerSrvc;
   
   var self = this;
   
   //plc parameter
   self.plcParamVo = {
       	plcId: '', 
       	factId: 'C'
       }
   
    self.vo = {
           PLC_ID: 'PLC-001'
        }
    
   self.btnFmbMonClick = btnFmbMonClickHandler;   
   self.btnFmbTbmClick = btnFmbTbmClickHandler;   
   self.btnFmbLineClick = btnFmbLineClickHandler;   
   self.btnFmbSpcClick = btnFmbSpcClickHandler;
   self.btnFmbTotalClick = btnFmbTotalClickHandler;
   self.btnFmbModeClick = btnFmbModeClickHandler;
   
   self.btnWorkerStart = WorkerStart;
   self.btnWorkerStop = WorkerStop;
   self.LotationSetting = LotationSetting;
   
   
      function btnFmbMonClickHandler() {
         WorkerStop();
         $location.url('/FmbMon');
      }
      function btnFmbTbmClickHandler() {
         WorkerStop();
         $location.url('/FmbTbm');
      }
      function btnFmbLineClickHandler() {
          WorkerStop();
          $location.url('/FmbLine');
       }
      function btnFmbSpcClickHandler() {
          WorkerStop();
          $location.url('/FmbSpc');
       }
      function btnFmbTotalClickHandler() {
          WorkerStop();
          $location.url('/FmbTotal');
       }
      function btnFmbModeClickHandler() {
          WorkerStop();
          $location.url('/FmbMode');
       }
      
    self.showModal = false;
    
      function LotationSetting() {
         WorkerStop();
         self.showModal = !self.showModal;
      }
      
    
      Worker3Start();
      
      
      
    if(localStorage.getItem('SettingTime')!=null){
    	self.Setting = JSON.parse(localStorage.getItem('SettingTime'));
    }else{
	  	self.Setting = [{"pageSeq":"1", "rotateTime": 10, "pageNm":"FmbMon"},
						{"pageSeq":"2", "rotateTime": 10, "pageNm":"FmbTbm"},
						{"pageSeq":"3", "rotateTime": 10, "pageNm":"FmbLine"},
						{"pageSeq":"4", "rotateTime": 10, "pageNm":"FmbSpc"},
						{"pageSeq":"5", "rotateTime": 10, "pageNm":"FmbTotal"},
    ]}
    
    self.submit1 = function() {
     var SettingTime =[{"pageSeq":"1", "rotateTime": self.Setting[0].rotateTime, "pageNm":"FmbMon"},
     					{"pageSeq":"2", "rotateTime": self.Setting[1].rotateTime, "pageNm":"FmbTbm"},
     					{"pageSeq":"3", "rotateTime": self.Setting[2].rotateTime, "pageNm":"FmbLine"},
     					{"pageSeq":"4", "rotateTime": self.Setting[3].rotateTime, "pageNm":"FmbSpc"},
     					{"pageSeq":"5", "rotateTime": self.Setting[4].rotateTime, "pageNm":"FmbTotal"}
     				]

       
       localStorage.setItem('SettingTime', JSON.stringify(SettingTime));
         
         for(var i=0; i<localStorage.length; i++)
       {
       console.log(localStorage.getItem(localStorage.key(i)));
       }
    }
   
    //Web Worker시작 함수
    function WorkerStart(){
       // 현재 페이지가 첫페이지가 아닐경우 첫페이지로 이동시킨다.
       if ($location.absUrl().split('/')[5] != 'FmbMon')
       {
          $location.url('/FmbMon');
       }
       
       //브라우저가 웹 워커를 지원하는지 검사한다 .
        if(!!window.Worker){    
           //워커가 이미 존재하면 종료시킨다 .
         if(workerList.worker1!=undefined){
        	 workerList.worker1.terminate();
        	workerList.worker1=undefined;
           }      
           
           //새로운 워커(객체)를 생성한다.
        
         workerList.worker1= new Worker("worker.js");       
            
           //Setting 정보를 Worker로 넘긴다.
           if(localStorage.getItem('SettingTime')!=null){
               workerList.worker1.postMessage(JSON.parse(localStorage.getItem('SettingTime')));
        	   
        	   
           }else{
        	   workerList.worker1.postMessage(self.Setting);
           }
             
           
           // 워커로부터 전달되는 메시지를 받는다.
           // 전달 받은 순서를 바탕으로 이동시킬 page를 지정한다.
           workerList.worker1.onmessage = function(evt){
                var seq = evt.data;
                var pager = JSON.parse(localStorage.getItem('SettingTime'))[seq].pageNm;
                console.log('전환될 페이지 - '+ pager);
                $location.url('/'+pager);
                $scope.$apply();
             }  
        }
        else {
          alert("현재 브라우저는 웹 워커를 지원하지 않습니다");
        }
      }
    
    //화면 전환 종료
    function WorkerStop(){
        if(workerList.worker1!=undefined){
        	workerList.worker1.terminate();
        	workerList.worker1=undefined;
        }
        //알람정보가져오는 워커 중지(정신사나워서 해놓은거라서 나중에 지워야함)
        if(workerList.worker3!=undefined){
        	workerList.worker3.terminate();
        	workerList.worker3=undefined;
        }
   }
   
    
    //설비plc 데이터 불러오기 Web Worker시작 함수
    function Worker3Start(){

       //브라우저가 웹 워커를 지원하는지 검사한다 .
        if(!!window.Worker){    
           
           //워커가 이미 존재하면 종료시킨다 .
           if(workerList.worker3!=undefined){
        	   workerList.worker3.terminate();
        	   workerList.worker3=undefined;
           }      
           
           //새로운 워커(객체)를 생성한다.
           workerList.worker3= new Worker("worker2.js");       
         
           //Setting 정보(화면전환 시간(초))를 Worker로 넘긴다.
           workerList.worker3.postMessage(5);
           
           // 워커로부터 전달되는 메시지를 받는다.
           		workerList.worker3.onmessage = function(evt){ 
           	    //설비 plc 데이터 가져오기
               	var plcPromise = CmmAjaxService.select("/mes/bas/selectFmbPlc.do", self.plcParamVo);
               	self.alarmList = {}
               	plcPromise.then(function(data) {

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
