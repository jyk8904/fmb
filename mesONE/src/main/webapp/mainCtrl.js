/**
 * @Class Name : mainCtrl.js
 * @Description : main.html
 * @Modification Information  
 * @
 * @  작업일       작성자      내용
 * @ ----------  ---------  -------------------------------
 * @ 2017.05.    정유경    최초생성
 * @ 
 * @since 2017.01.01
 * @version 1.0
 * @function
 * 
 * 
 * 
 *
 */
'use strict';

angular
.module('app')
.controller('MainCtrl', ['$http'
                       , '$scope'
                       , 'CmmAjaxService'
                       , 'CmmWorkerSrvc'
                       /*, 'CmmFactSrvc' 선택된 공장 데이터 공유*/
                       , '$location'
                       , '$timeout'
                       , '$q'
                       , '$interval'
                       , '$window'
                       , '$rootScope' //상위스코프접근
                       ,  function ($http
                                 , $scope
                                 , CmmAjaxService
                                 , CmmWorkerSrvc
                                /* , CmmFactSrvc*/
                                 , $location
                                 , $timeout
                                 , $q
                                 , $interval
                                 , $window
                                 , $rootScope
                                 ) {
   var workerList = CmmWorkerSrvc;
   var self = this;
   /*plc parameter*/
   self.plcParamVo={};
   self.plcParamVo.plcId ='';
   self.plcParamVo.factId = 'C';
   //self.plcParamVo.factId = CmmFactSrvc.getSelectedFactId() ;
   //화면전환 모달창 default값
   self.showModal = false;
   
   self.vo = {PLC_ID: 'PLC-001'}
   /*이벤트*/
   self.btnFmbMonClick = btnFmbMonClickHandler;   
   self.btnFmbTbmClick = btnFmbTbmClickHandler;   
   self.btnFmbLineAClick = btnFmbLineAClickHandler;
   self.btnFmbLineBClick = btnFmbLineBClickHandler;  
   self.btnFmbLineCClick = btnFmbLineCClickHandler;  
   self.btnFmbSpcClick = btnFmbSpcClickHandler;
   self.btnFmbTotalClick = btnFmbTotalClickHandler;
   self.btnFmbModeClick = btnFmbModeClickHandler;
   self.btnWorkerStart = WorkerStart;
   self.btnWorkerStop = WorkerStop;
   self.LotationSetting = LotationSetting;
   self.submit1 = submitLotationSetting;
   //self.changeFact = changeFact;
   
   /*공장선택시*/
   /*   function changeFact() {
	   //하위 컨트롤러에게 이벤트전송
	    $rootscope.$broadcast("event:changeFact",{selectedFact: self.plcParamVo.factId});
	   
	   	console.log(self.plcParamVo.factId);
		CmmFactSrvc.setSelectedFactId(self.plcParamVo.factId);
		
		if(workerList.worker3!=undefined){
			workerList.worker3.terminate();
			workerList.worker3=undefined;
		    Worker3Start();
		}
    }
    */
   
   
   //알람정보 워커시작
   Worker3Start();
   defaultLotationSetting();
   submitLotationSetting();
      
   
   function defaultLotationSetting(){
	   if(localStorage.getItem('SettingTime')!=null){
		   self.Setting = JSON.parse(localStorage.getItem('SettingTime'));
	   }else{
		   self.Setting = [{"pageSeq":"1", "rotateTime": 10, "dataTime": 5, "pageNm":"FmbMon"},
			   			   {"pageSeq":"2", "rotateTime": 10, "dataTime": 5, "pageNm":"FmbTotal"},
			   			   {"pageSeq":"3", "rotateTime": 10, "dataTime": 5, "pageNm":"FmbLineA"},
			   			   {"pageSeq":"4", "rotateTime": 10, "dataTime": 5, "pageNm":"FmbLineB"},
			   			   {"pageSeq":"5", "rotateTime": 10, "dataTime": 5, "pageNm":"FmbLineC"},
			   			   {"pageSeq":"6", "rotateTime": 10, "dataTime": 5, "pageNm":"FmbTbm"}];
		  	localStorage.setItem('SettingTime', JSON.stringify(self.Setting));
	   }
	   workerList.worker2data =JSON.parse(localStorage.getItem('SettingTime'));
	   
   }
		 

	 function submitLotationSetting() {
		   var SettingTime =[{"pageSeq":"1", "rotateTime": self.Setting[0].rotateTime, "dataTime": self.Setting[0].dataTime, "pageNm":"FmbMon"},
						     {"pageSeq":"2", "rotateTime": self.Setting[1].rotateTime, "dataTime": self.Setting[1].dataTime, "pageNm":"FmbTotal"},
						     {"pageSeq":"3", "rotateTime": self.Setting[2].rotateTime, "dataTime": self.Setting[2].dataTime, "pageNm":"FmbLineA"},
						     {"pageSeq":"4", "rotateTime": self.Setting[3].rotateTime, "dataTime": self.Setting[3].dataTime, "pageNm":"FmbLineB"},
						     {"pageSeq":"5", "rotateTime": self.Setting[4].rotateTime, "dataTime": self.Setting[4].dataTime, "pageNm":"FmbLineC"},
						     {"pageSeq":"5", "rotateTime": self.Setting[5].rotateTime, "dataTime": self.Setting[5].dataTime, "pageNm":"FmbTbm"}];
		   localStorage.setItem('SettingTime', JSON.stringify(SettingTime));
		   /*for(var i=0; i<localStorage.length; i++){
			   console.log(localStorage.getItem(localStorage.key(i)));
		   }*/
		   workerList.worker2data =JSON.parse(localStorage.getItem('SettingTime'));
		   workerList.worker2sts = 'stop';
	   }


   function btnFmbMonClickHandler() {
         WorkerStop();
         //callParamSetting();
         $location.url('/FmbMon');
      }
      function btnFmbTbmClickHandler() {
         WorkerStop();
        // callParamSetting();
         $location.url('/FmbTbm');
      }
      function btnFmbLineAClickHandler() {
          WorkerStop();
         // callParamSetting();
          $location.url('/FmbLineA');
       }
      function btnFmbLineBClickHandler() {
          WorkerStop();
         // callParamSetting();
          $location.url('/FmbLineB');
       }
      function btnFmbLineCClickHandler() {
          WorkerStop();
          //callParamSetting();
          $location.url('/FmbLineC');
       }
      function btnFmbSpcClickHandler() {
          WorkerStop();
          //callParamSetting();
          $location.url('/FmbSpc');
       }
      function btnFmbTotalClickHandler() {
          WorkerStop();
          //callParamSetting();
          $location.url('/FmbTotal');
       }
      function btnFmbModeClickHandler() {
          WorkerStop();
          //callParamSetting();
          $location.url('/FmbMode');
       }
      
      function LotationSetting() {
         WorkerStop();
         self.showModal = !self.showModal;
      }
      
  
    //Web Worker1 시작버튼 클릭 이벤트
    function WorkerStart(){
       // 현재 페이지가 첫페이지가 아닐경우 첫페이지로 이동시킨다.
       if ($location.absUrl().split('/')[5] != 'FmbMon'){
          $location.url('/FmbMon');
       }
       //브라우저가 웹 워커를 지원하는지 검사한다 .
        if(!!window.Worker){   
        	//워커가 실행중이면 종료시킨다.
        	WorkerStop();
            //새로운 워커(객체)를 생성한다.
            workerList.worker1= new Worker("worker.js");       
            if(localStorage.getItem('SettingTime')!= null){
              	 workerList.worker1.postMessage(JSON.parse(localStorage.getItem('SettingTime')));
      	     }else{
      	    	 workerList.worker1.postMessage(self.Setting);
      	    	 //setting정보를 워커2에게 넘김
      	    	 //callParamSetting();
      	           // 워커로부터 전달되는 메시지를 받는다.
      	           // 전달 받은 순서를 바탕으로 이동시킬 page를 지정한다.
      	     }	 
      	           workerList.worker1.onmessage = function(evt){
      	        	   console.log("메인 받은데이터"+evt)
      	                var seq = evt.data;
      	                var pager = JSON.parse(localStorage.getItem('SettingTime'))[seq].pageNm;
      	                console.log('전환될 페이지 - '+ pager);
      	                $location.url('/'+pager);
      	                $scope.$apply();
      	             }  
        }else {
          alert("현재 브라우저는 웹 워커를 지원하지 않습니다");
        }
      }
    
    
/*    function callParamSetting(){
    	//Setting 정보를 Worker로 넘긴다.
    	if(localStorage.getItem('SettingTime')!= null){
    		workerList.worker2data = JSON.parse(localStorage.getItem('SettingTime'));
    		console.log(workerList.worker2data );
    	}else{
    		workerList.worker2data(self.Setting);
    	}
    }*/
    
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
           workerList.worker3= new Worker("worker3.js");       
         
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
