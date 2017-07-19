/**
 * 
 */
'use strict';

angular
.module('app')
.controller('MainCtrl', [ '$http'
                       , '$scope'
                       , 'CmmWorkerSrvc'
                       , '$location'
                       , '$timeout'
                       , '$q'
                       , '$interval'
                       ,  function ( $http
                                 , $scope
                                 , CmmWorkerSrvc
                                 , $location
                                 , $timeout
                                 , $q
                                 , $interval) {
   var workerService = CmmWorkerSrvc.worker;
   var worker1 = workerService.worker1;
   var worker2 = workerService.worker2;
   
   var i = 1;
   var self = this;
    self.vo = {
           PLC_ID: 'PLC-001'
        }
    
   self.btnFmb006Click = btnFmb006ClickHandler;   
   self.btnFmbTbmClick = btnFmbTbmClickHandler;   
   self.btnFmbLineClick = btnFmbLineClickHandler;   
   self.btnFmbSpcClick = btnFmbSpcClickHandler
   
   self.btnWorkerStart = WorkerStart;
   self.btnWorkerStop = WorkerStop;
   self.LotationSetting = LotationSetting;
   //start();
   
   
      function btnFmb006ClickHandler() {
         WorkerStop();
         $location.url('/Fmb006');
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
      
      
    self.showModal = false;
    
      function LotationSetting() {
         WorkerStop();
         self.showModal = !self.showModal;
      }
      

    if(localStorage.getItem('SettingTime')!=null){
    	self.Setting = JSON.parse(localStorage.getItem('SettingTime'));
    }else{
	  	self.Setting = [{"pageSeq":"1", "rotateTime": 10, "pageNm":"Fmb006"},
						{"pageSeq":"2", "rotateTime": 10, "pageNm":"FmbTbm"},
						{"pageSeq":"3", "rotateTime": 10, "pageNm":"FmbLine"},
						{"pageSeq":"4", "rotateTime": 10, "pageNm":"FmbSpc"}
    ]}
    
    self.submit1 = function() {
    	console.log(self.Setting[0].rotateTime)
     var SettingTime =[{"pageSeq":"1", "rotateTime": self.Setting[0].rotateTime, "pageNm":"Fmb006"},
     					{"pageSeq":"2", "rotateTime": self.Setting[1].rotateTime, "pageNm":"FmbTbm"},
     					{"pageSeq":"3", "rotateTime": self.Setting[2].rotateTime, "pageNm":"FmbLine"},
     					{"pageSeq":"4", "rotateTime": self.Setting[3].rotateTime, "pageNm":"FmbSpc"}
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
       if ($location.absUrl().split('/')[5] != 'Fmb006')
       {
          $location.url('/Fmb006');
       }
       
       //브라우저가 웹 워커를 지원하는지 검사한다 .
        if(!!window.Worker){    
           //워커가 이미 존재하면 종료시킨다 .
        	CmmWorkerSrvc.workerTest(worker1);
       /*    if(worker1!=undefined){
             worker1.terminate();
             worker1=undefined;
           }      */
           
           //새로운 워커(객체)를 생성한다.
        	CmmWorkerSrvc.newWorker1("worker.js");
        	//worker1= new Worker("worker.js");       
            
           //Setting 정보를 Worker로 넘긴다.
           if(localStorage.getItem('SettingTime')!=null){
               //worker.postMessage(JSON.parse(localStorage.getItem('SettingTime')));
        	   CmmWorkerSrvc.post(worker1, JSON.parse(localStorage.getItem('SettingTime')));
        	   
           }else{
        	   CmmWorkerSrvc.post(worker1, self.Setting);
           }
             
           
           // 워커로부터 전달되는 메시지를 받는다.
           // 전달 받은 순서를 바탕으로 이동시킬 page를 지정한다.
           CmmWorkerSrvc.on(worker1, )
           worker.onmessage = function(evt){ 
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
        if(worker1!=undefined){
          worker1.terminate();
          worker1=undefined;
        }
   }
   
}]);
