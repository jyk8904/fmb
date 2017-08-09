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
                       , '$window'
                       , '$rootScope' 
                       , '$mdSidenav'
                       , function ($http
                                 , $scope
                                 , CmmAjaxService
                                 , CmmWorkerSrvc
                                 , $location
                                 , $timeout
                                 , $q
                                 , $interval
                                 , $window
                                 , $rootScope
                                 , $mdSidenav
                                 ) {
	var workerList = CmmWorkerSrvc;
	var self = this;

	self.alarmListLen = {};


	self.plcParamVo = {};
	self.plcParamVo.plcId = '';
	self.plcParamVo.factId = '';
	self.bgTheme = 'blue';
	//화면전환 모달창 default값
	self.showModal = false;

	self.vo = { PLC_ID: 'PLC-001' }
	self.btnFmbMonClick = btnFmbMonClickHandler;
	self.btnFmbCwMonClick = btnFmbCwMonClickHandler;
	self.btnFmbTbmClick = btnFmbTbmClickHandler;
	self.btnFmbLineAClick = btnFmbLineAClickHandler;
	self.btnFmbLineBClick = btnFmbLineBClickHandler;
	self.btnFmbLineCClick = btnFmbLineCClickHandler;
	self.btnFmbSpcClick = btnFmbSpcClickHandler;
	self.btnFmbTotalClick = btnFmbTotalClickHandler;
	self.btnFmbModeClick = btnFmbModeClickHandler;
	self.btnWorkerStart = WorkerStart;
	self.btnWorkerStop = function () { workerList.workerStop(workerList.worker1); }
   	self.LotationSetting = LotationSetting;
   	self.submit1 = submitLotationSetting;
/*    self.onSwipeRight = function() {
    	alert("do it!!!");
        //$mdSidenav('left1').open();
    };
   */ $scope.onSwipeLeft =toggleLeft;
    	
    	function toggleLeft() {
          $mdSidenav('left1').close();
    };
          
      
   	$scope.$on('$routeChangeSuccess', function () {
   		var page = $location.path();
       
   		self.bgTeme = 'blue';
       // 뒷배경 색상을 페이지별 테마를 분기시킬수 있다.
       // 현재 버전에서는 블루 색사응로 통일 됨
       /*if (page == '/FmbMon') {
           self.bgTheme = 'blue';
       } else {
           self.bgTheme = 'black';
       }*/
	});
   
    //전환될 페이지 리스트
	var pageList = [{ "pageNm": "FmbCwMon"   }
			      , { "pageNm": "FmbMon"     }
			      , { "pageNm": "FmbTotal"   }
			      , { "pageNm": "FmbLineA"   }
			      , { "pageNm": "FmbLineB"   }
			      , { "pageNm": "FmbLineC"   }
			      , { "pageNm": "FmbTbm"     }
			      , { "pageNm": "FmbMainMon" }
			       ]
   self.Setting={};
   
	//설비 plc 알람정보 데이터 가져오기
  	var plcPromise = CmmAjaxService.select("/mes/bas/selectFmbPlc.do", self.plcParamVo);
    $scope.alarmList = {}
  	plcPromise.then(function(data) {
  		for (var i = 0; i < data.length; i++) {
  			if(data[i].eqptSts=='0'){ //sts== 4일경우 하단바에 알람 발생 경고()
  				$scope.alarmList[i]=data[i];
  			}
  		}
  	}, function(data){
  		alert('fail: '+ data)
  	});
  	
  	
   //알람정보워커
   Worker3Start();
   defaultLotationSetting();

   function defaultLotationSetting(){
	   if(localStorage.getItem('SettingTime')!=null){
		   self.Setting = JSON.parse(localStorage.getItem('SettingTime'));
		   for (var i =0; i<self.Setting.length; i++){
				self.Setting[i] = {"pageSeq":self.Setting[i].pageSeq, 
								   "rotateTime": Number(self.Setting[i].rotateTime), 
								   "dataTime": Number(self.Setting[i].dataTime),
								   "pageNm":self.Setting[i].pageNm, 
								   "switcher" : self.Setting[i].switcher
								   }
		   }
	   }else{
		   for(var j =0; j<pageList.length; j++){ // 기본설정값 지정
			   	self.Setting[j] = {"pageSeq":j+1, "rotateTime": Number(10), "dataTime": Number(5), "pageNm":pageList[j].pageNm, "switcher" : true}
		   }
		  	localStorage.setItem('SettingTime', JSON.stringify(self.Setting));
	   }
	   workerList.worker2.data =JSON.parse(localStorage.getItem('SettingTime'));
   }
		 
   //설비 plc 알람정보 데이터 가져오기
   var plcPromise = CmmAjaxService.select("/mes/bas/selectFmbPlc.do", self.plcParamVo);
   self.alarmList = {}
   plcPromise.then(function (data) {
       for (var i = 0; i < data.length; i++) {
           if (data[i].eqptSts == '0') { //sts== 4일경우 하단바에 알람 발생 경고()
               self.alarmList[i] = data[i];
           }
       }
   }, function (data) {
       alert('fail: ' + data)
   });


   //알람정보워커
   Worker3Start();

   defaultLotationSetting();

   function defaultLotationSetting() {
       if (localStorage.getItem('SettingTime') != null) {
           self.Setting = JSON.parse(localStorage.getItem('SettingTime'));
           for (var i = 0; i < self.Setting.length; i++) {
               self.Setting[i] = { "pageSeq": self.Setting[i].pageSeq,
                   "rotateTime": Number(self.Setting[i].rotateTime),
                   "dataTime": Number(self.Setting[i].dataTime),
                   "pageNm": self.Setting[i].pageNm,
                   "switcher": self.Setting[i].switcher
               }

           }
       } else {
           for (var j = 0; j < pageList.length; j++) { // 기본설정값 지정
               self.Setting[j] = { "pageSeq": j + 1, "rotateTime": Number(10), "dataTime": Number(5), "pageNm": pageList[j].pageNm, "switcher": true }
           }
           localStorage.setItem('SettingTime', JSON.stringify(self.Setting));
       }
       workerList.worker2.data = JSON.parse(localStorage.getItem('SettingTime'));
   }


   function submitLotationSetting() {

	   console.log(self.Setting);
		  var SettingTime = [];
		   for(var j =0; j<pageList.length; j++){
			   SettingTime[j] = {"pageSeq":j+1, "rotateTime": Number(self.Setting[j].rotateTime), "dataTime":  Number(self.Setting[j].dataTime), "pageNm":pageList[j].pageNm, "switcher" : self.Setting[j].switcher}
		   }
		   localStorage.setItem('SettingTime', JSON.stringify(SettingTime));
		   for(var i=0; i<localStorage.length; i++){
			   console.log(localStorage.getItem(localStorage.key(i)));
		   }
		   workerList.worker2.data =JSON.parse(localStorage.getItem('SettingTime'));
		   workerList.worker2.sts = 'stop';
		   
		   self.showModal = false;
	   }

   function btnFmbMonClickHandler() {
	   	workerList.workerStop(workerList.worker1);
         //callParamSetting();
	   	toggleLeft();
         $location.url('/FmbMon');
      }
   function btnFmbCwMonClickHandler() {
	   console.log("123");
	 	workerList.workerStop(workerList.worker1);
	 	toggleLeft();
       $location.url('/FmbCwMon');
       
    }
      function btnFmbTbmClickHandler() {
    	workerList.workerStop(workerList.worker1);
    	toggleLeft();
         $location.url('/FmbTbm');
      }
      function btnFmbLineAClickHandler() {
    	 workerList.workerStop(workerList.worker1);
    	 toggleLeft();
          $location.url('/FmbLineA');
       }
      function btnFmbLineBClickHandler() {
    	 workerList.workerStop(workerList.worker1);
    	 toggleLeft();
          $location.url('/FmbLineB');
       }
      function btnFmbLineCClickHandler() {
    	  workerList.workerStop(workerList.worker1);
    	  toggleLeft();
          $location.url('/FmbLineC');
       }
      function btnFmbSpcClickHandler() {
    	  workerList.workerStop(workerList.worker1);
    	  toggleLeft();
          $location.url('/FmbSpc');
       }
      function btnFmbTotalClickHandler() {
    	  workerList.workerStop(workerList.worker1);
    	  toggleLeft();
          $location.url('/FmbTotal');
       }
      function btnFmbModeClickHandler() {
    	  workerList.workerStop(workerList.worker1);
          $location.url('/FmbMode');
       }
      
      function LotationSetting() {
    	  workerList.workerStop(workerList.worker1);
         self.showModal = !self.showModal;
      }
      
  
    //Web Worker1 시작버튼 클릭 이벤트
    function WorkerStart(){
       // 현재 페이지가 첫페이지가 아닐경우 첫페이지로 이동시킨다.
      /* if ($location.absUrl().split('/')[5] != 'FmbMon'){
          $location.url('/FmbMon');
       }*/
    	var curPageSeq;
    	var curPage = $location.url();
    	for(var i = 0; i<pageList.length; i++){
    		if(curPage == '/'+pageList[i].pageNm){
    			curPageSeq = i;
    		}
    	}
    	console.log(curPage);
       //브라우저가 웹 워커를 지원하는지 검사한다 .
        if(!!window.Worker){   
        	//워커가 실행중이면 종료시킨다.
	           if(workerList.worker1.worker!=undefined){
	        	  workerList.worker1.worker.terminate();
	        	  workerList.worker1.worker=undefined;
	           }      
            //새로운 워커(객체)를 생성한다.
            workerList.worker1.worker= new Worker("worker.js");       
            if(localStorage.getItem('SettingTime')!= null){
              	 workerList.worker1.worker.postMessage([JSON.parse(localStorage.getItem('SettingTime')), curPageSeq]);
      	     }else{
      	    	 workerList.worker1.worker.postMessage([self.Setting, curPageSeq]);
      	    	 //setting정보를 워커2에게 넘김
      	    	 //callParamSetting();
      	           // 워커로부터 전달되는 메시지를 받는다.
      	           // 전달 받은 순서를 바탕으로 이동시킬 page를 지정한다.
      	     }	 
      	           workerList.worker1.worker.onmessage = function(evt){
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
    
    
    //설비plc 데이터 불러오기 Web Worker시작 함수
    function Worker3Start(){
       //브라우저가 웹 워커를 지원하는지 검사한다 .
        if(!!window.Worker){    
           
           //워커가 이미 존재하면 종료시킨다 .
           if(workerList.worker3.worker!=undefined){
        	   workerList.worker3.worker.terminate();
        	   workerList.worker3.worker=undefined;
           }      
           
           //새로운 워커(객체)를 생성한다.
           workerList.worker3.worker= new Worker("worker3.js");       
         
           //Setting 정보(화면전환 시간(초))를 Worker로 넘긴다.
           workerList.worker3.worker.postMessage(5);
           
           // 워커로부터 전달되는 메시지를 받는다.
           		workerList.worker3.worker.onmessage = function(evt){ 
           	    //설비 plc 데이터 가져오기
               	var plcPromise = CmmAjaxService.select("/mes/bas/selectFmbPlc.do", self.plcParamVo);
               	plcPromise.then(function(data) {
               	 if($location.url() == '/'+'FmbMode'){ // mode일 경우 알람정보 지우기
                  	 $scope.alarmList = {};
               	}else{  
               		for (var i = 0; i < data.length; i++) {
               			if(data[i].eqptSts=='0'){ //sts== 4일경우 하단바에 알람 발생 경고()
               			$scope.alarmList[i]=data[i];
               			}
               		}
                }
               	}, function(data){
               		alert('fail: '+ data)
               });
               	
                self.alarmListLen = Object.keys($scope.alarmList).length;
             }  
        }
        else {
          alert("현재 브라우저는 웹 워커를 지원하지 않습니다");
        }
      }
}]);
                     