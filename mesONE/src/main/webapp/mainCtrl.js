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
	workerList.worker2.sts = 'off';
	var self = this;
	$scope.isMobile = false;
	$scope.login = fnLogin;
	$scope.logOut = fnLogout;
	$scope.loginChk = false;
	$scope.keyUpLogin = onKeyupPasswd;
   
   if(localStorage.getItem("autoLogin")=="true"){ //자동로그인에 체크가 되어있던경우
	   $scope.id = localStorage.getItem('id');
	   $scope.pw = localStorage.getItem('password');
	   
	   //로컬데이터->세션저장
       sessionStorage.setItem("id", $scope.id);
       sessionStorage.setItem("login", true);
       $scope.loginChk = true;
   }
   
	// 모바일 체크 함수 실행
	isMobileFunc();
    
    
	self.alarmListLen = {};
	self.plcParamVo = {};
	self.plcParamVo.plcId = '';
	self.plcParamVo.factId = '';
	self.bgTheme = 'blue';
	//화면전환 모달창 default값
	self.showModal = false;

	self.vo = { PLC_ID: 'PLC-001' }
	self.btnFmbMonClick = btnFmbMonClickHandler;
	self.btnFmbAndonClick = btnFmbAndonClickHandler;
	self.btnFmbTbmClick = btnFmbTbmClickHandler;
	self.btnFmbLineAClick = btnFmbLineAClickHandler;
	self.btnFmbLineBClick = btnFmbLineBClickHandler;
	self.btnFmbLineCClick = btnFmbLineCClickHandler;
	self.btnFmbProdClick = btnFmbProdClickHandler;
	self.btnFmbSpcClick = btnFmbSpcClickHandler;
	self.btnFmbTotalClick = btnFmbTotalClickHandler;
	self.btnFmbModeClick = btnFmbModeClickHandler;
	self.btnWorkerStart = WorkerStart;
	self.btnWorkerStop = function () { workerList.workerStop(workerList.worker2); }
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
	var pageList = [{ "pageNm": "FmbAndon"   }
				  , { "pageNm": "FmbMon"     }
			      , { "pageNm": "FmbTotal"   }
			      , { "pageNm": "FmbLineA"   }
			      , { "pageNm": "FmbLineB"   }
			      , { "pageNm": "FmbLineC"   }
			      , { "pageNm": "FmbTbm"     }
			      , { "pageNm": "FmbProd" 	 }
			       ]
   self.Setting=[];
	
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
   //Worker3Start();
   defaultLotationSetting();
   
   //페이지전환 데이터 기본값 설정
   function defaultLotationSetting(){
	   if(localStorage.getItem('SettingTime')!=null){
		   self.Setting = JSON.parse(localStorage.getItem('SettingTime'));
		   for (var i =0; i<self.Setting.length; i++){
				self.Setting[i] = {"pageSeq":self.Setting[i].pageSeq, 						//페이지 전환순서
								   //"rotateTime": Number(self.Setting[i].rotateTime), 		//페이지 전환시간
								   "dataTime": Number(self.Setting[i].dataTime),			//페이지 내 데이터 갱신 시간
								   "switchNum": Number(self.Setting[i].switchNum),			//페이지 내 데이터 갱신 횟수
								   "pageNm":self.Setting[i].pageNm, 						//페이지 url
								   "switcher" : self.Setting[i].switcher					//페이지 표시 여부
								   };
		   }
	   }else{
		   for(var j =0; j<pageList.length; j++){ // 기본설정값 지정
			   	self.Setting[j] = {"pageSeq":j+1, "dataTime": Number(5), "switchNum": Number(3),  "pageNm":pageList[j].pageNm, "switcher" : true};
			  
		   }
		  	localStorage.setItem('SettingTime', JSON.stringify(self.Setting));		//로컬스토리지 저장
	   }
	   workerList.worker2.data =JSON.parse(localStorage.getItem('SettingTime'));    //worker2의 data로 저장
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


   function submitLotationSetting() {
		  var SettingTime = [];
		  var rotationChk= false;
		  for(var j =0; j<pageList.length; j++){
			  if (self.Setting[j].switcher == true){
				   rotationChk = true;
			  }
		  }
		  if(rotationChk==false){
			   window.alert("적어도 하나의 페이지는 선택되어야합니다.")
			   self.showModal = false;
			   /* 모든 페이지를 off시키고 start 버튼을 클릭했을때 무한루프생기는 것을 
			    * 방지하기 위해서 모두 off할수 없도록 해야함
			    * */ 
			   
		  }else{
			  
			  
		  for(var j =0; j<pageList.length; j++){
			   SettingTime[j] = {"pageSeq":j+1,  "dataTime":  Number(self.Setting[j].dataTime), "switchNum":  Number(self.Setting[j].switchNum), "pageNm":pageList[j].pageNm, "switcher" : self.Setting[j].switcher}
			  
		   }
		  		localStorage.setItem('SettingTime', JSON.stringify(SettingTime));
			   for(var i=0; i<localStorage.length; i++){
				   console.log(localStorage.getItem(localStorage.key(i)));
			   }
			   workerList.worker2.data =JSON.parse(localStorage.getItem('SettingTime'));
			   
			   self.showModal = false;
		   }
		   
	   }

   function btnFmbMonClickHandler() {
         //callParamSetting();
	   	toggleLeft();
         $location.url('/FmbMon');
      }
   function btnFmbAndonClickHandler() {
	 	toggleLeft();
       $location.url('/FmbAndon');
       
    }
      function btnFmbTbmClickHandler() {
    	toggleLeft();
         $location.url('/FmbTbm');
      }
      function btnFmbLineAClickHandler() {
    	 toggleLeft();
          $location.url('/FmbLineA');
       }
      function btnFmbLineBClickHandler() {
    	 toggleLeft();
          $location.url('/FmbLineB');
       }
      function btnFmbLineCClickHandler() {
    	  toggleLeft();
          $location.url('/FmbLineC');
       }
      function btnFmbSpcClickHandler() {
    	  toggleLeft();
          $location.url('/FmbSpc');
       }
      function btnFmbProdClickHandler() {
    	  toggleLeft();
          $location.url('/FmbProd');
       }
      function btnFmbTotalClickHandler() {
    	  toggleLeft();
          $location.url('/FmbTotal');
       }
      function btnFmbModeClickHandler() {
          $location.url('/FmbMode');
       }
      
      function LotationSetting() {
         self.showModal = !self.showModal;
      }
      
  
    //Web Worker1 시작버튼 클릭 이벤트
    function WorkerStart(){
    	workerList.worker2.sts = 'on';	//페이지 전환 여부  상태
    	var switchPage = workerList.worker2.sts;
    	var curPageSeq;			
    	var curPage = $location.url();
    	for(var i = 0; i<pageList.length; i++){
    		if(curPage == '/'+pageList[i].pageNm){
    			curPageSeq = i; //현재 페이지 seq
    		}
    	}
    	if(curPageSeq==undefined){ 	//메인페이지에서 시작할경우, 바로 첫페이지로 이동
    		curPageSeq = 0;
    		while(workerList.worker2.data[curPageSeq].switcher == false){
        		curPageSeq = curPageSeq + 1;
        		if(curPageSeq>=pageList.length){
        			curPageSeq = 0;
        	    }
        	}
    		
    		var nextPage = pageList[curPageSeq].pageNm
    		$location.url('/'+nextPage);
    		
    	}else{						//다른페이지에서 시작할경우
    		curPageSeq = curPageSeq + 1;
    		if(curPageSeq>=pageList.length){
    			curPageSeq = 0;
    	    }
    		while(workerList.worker2.data[curPageSeq].switcher == false){
        		curPageSeq = curPageSeq + 1;
        		if(curPageSeq>=pageList.length){
        			curPageSeq = 0;
        	    }
        	}
    		var nextPage=pageList[curPageSeq].pageNm
    		$location.url('/'+nextPage);
    	 
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
           workerList.worker3.worker.postMessage(6);
           
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
    
    
    
    /*로그인*/

    function fnLogin(){
        var objLogin = $scope.id 			//id 저장 변수	
        var objPasswd = $scope.pw;			//pw 저장 변수
        var objAutoLogin= $scope.autoLogin; //로그인 여부 저장 변수
        console.log(objLogin);
        console.log(objPasswd);
        if(objLogin == undefined || objLogin==""){
            alert("아이디를 입력하세요");
            self.focusId = true;
            return ;
        }
        else if(objPasswd == undefined || objPasswd==""){
            alert("비밀번호를 입력하세요");
            self.focusPw = true;
            return ;
        }
        // 서버로 전송
        // 아이디, 패스워드 체크
        if((objLogin =="aaa"|| objLogin =="developer") && objPasswd =="bbb"){
        	//console.log("로그인")
        	//console.log(objAutoLogin);
        	//console.log(localStorage.getItem("autoLogin"))
        	//자동로그인시 로컬스토리지 저장
        	if(objAutoLogin ==true 
        		&& (localStorage.getItem("autoLogin")==null 
        				|| localStorage.getItem("autoLogin")=="false")){ //자동로그인 체크
            	localStorage.setItem("autoLogin", true);
            	localStorage.setItem("id", objLogin);
            	localStorage.setItem("password", objPasswd);
            	//console.log(localStorage.getItem("autoLogin"));
        	}
        	 //세션저장
            sessionStorage.setItem("id", objLogin);
            sessionStorage.setItem("login", true);
            
            btnFmbMonClickHandler();
            
            if(sessionStorage.getItem("login")=="true"){
                $scope.loginChk = true
            }

        }else{
        	alert("아이디와 비밀번호를 확인하세요");
        	return;
        }
       
    }
    /* 로그 아웃 */
    function fnLogout(){
    	console.log("로그아웃");
    	
    	$scope.id = "";
    	$scope.pw = "";
    	
    	 //로그아웃시 자동 로그인 로컬스토리지 지움
    	if(localStorage.getItem("autoLogin")=="true"){
    		localStorage.removeItem("autoLogin");
    		localStorage.removeItem("id");
        	localStorage.removeItem("password");
        	$scope.autoLogin = false;
        	}       
    	
        sessionStorage.setItem("login", false);
        sessionStorage.removeItem("id");
        $scope.loginChk =false;
    }
    
    /* 키보드 엔터 로그인 */
    function onKeyupPasswd(ev){
        var evKeyup = null;
        if(ev)                                          // firefox
            evKeyup = ev;    
        else                                            // explorer
            evKeyup = window.event;
            
        if(evKeyup.keyCode == 13){                      // enter key code:13
           
            fnLogin();    
        }    // end if
    } 

    // 모바일 체크 함수 정의
	function isMobileFunc(){
		var UserAgent = navigator.userAgent;

		if (UserAgent.match(/iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null)
		{
			$scope.isMobile = true;
		}else{
			$scope.isMobile =  false;
		   //알람정보워커 start
		   Worker3Start();
		}
		console.log($scope.isMobile)
		console.log( navigator.userAgent)
	}
	
}]);