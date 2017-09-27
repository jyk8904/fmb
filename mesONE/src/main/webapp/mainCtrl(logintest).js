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

    var self = this;
	var workerList = CmmWorkerSrvc;
	workerList.worker2.sts = 'on'; //페이지 순환여부	
	self.switchPage = workerList.worker2.sts;
	var winwin;
	$scope.loginChk = sessionStorage.getItem("login");//로그인여부
	console.log($scope.loginChk )

	$scope.logOut = fnLogout;
	$scope.winClose = fnWinClose;
	$scope.scroll = true;
	$scope.duration = 60000;


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
	self.btnFmbLine001Click = btnFmbLine001ClickHandler;
	self.btnFmbLine002Click = btnFmbLine002ClickHandler;
	self.btnFmbLine003Click = btnFmbLine003ClickHandler;
	self.btnFmbLine004Click = btnFmbLine004ClickHandler;
	self.btnFmbLine005Click = btnFmbLine005ClickHandler;
	self.btnFmbLine006Click = btnFmbLine006ClickHandler;
	self.btnFmbLine007Click = btnFmbLine007ClickHandler;
	self.btnFmbFactAllClick = btnFmbFactAllClickHandler;
	self.btnFmbFact001Click = btnFmbFact001ClickHandler;
	self.btnFmbFact002Click = btnFmbFact002ClickHandler;
	self.btnFmbFact003Click = btnFmbFact003ClickHandler;
	self.btnFmbFact004Click = btnFmbFact004ClickHandler;
	self.btnFmbFact005Click = btnFmbFact005ClickHandler;
	self.btnFmbFact006Click = btnFmbFact006ClickHandler;
	self.btnFmbFact007Click = btnFmbFact007ClickHandler;
	self.btnLoginClick	    = self.btnLoginClickHandler 
	self.btnFmbSpcClick = btnFmbSpcClickHandler;
	self.btnFmbTotalClick = btnFmbTotalClickHandler;
	self.btnFmbModeClick = btnFmbModeClickHandler;
	self.btnWorkerStart = WorkerStart;
	self.btnWorkerStop = function () { workerList.workerStop(workerList.worker2); self.switchPage = "off"}
   	self.LotationSetting = LotationSetting;
   	self.submit1 = submitLotationSetting;
   	
   	self.switchNumChk= switchNumChk;
   	self.dataTimeChk= dataTimeChk;
   	$scope.Worker3Start = Worker3Start;

   	 	function fnWinClose() {
		
		   	 setTimeout(function(){
		   	     window.open('', '_self', '');
		   	     this.window.close();
		   	 }, 100);
   	   	}
   	  
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
	var pageList = [/*{ "pageNm": "FmbAndon", 	"pageNmKr": "안돈 모니터링"		}*/
				   { "pageNm": "FmbMon", 		"pageNmKr": "설비 가동현황"		}
			      , { "pageNm": "FmbTotal", 	"pageNmKr": "생산자원 종합현황"	}
			      , { "pageNm": "FmbLine001", 	"pageNmKr": "LINE별 생산실적 1반"}
			      , { "pageNm": "FmbLine002",	"pageNmKr": "LINE별 생산실적 2반"}
			      , { "pageNm": "FmbLine003", 	"pageNmKr": "LINE별 생산실적 3반"}
			      , { "pageNm": "FmbLine004", 	"pageNmKr": "LINE별 생산실적 4반"}
			      , { "pageNm": "FmbLine005", 	"pageNmKr": "LINE별 생산실적 5반"}
			      , { "pageNm": "FmbLine006", 	"pageNmKr": "LINE별 생산실적 6반"}
			      , { "pageNm": "FmbLine007", 	"pageNmKr": "LINE별 생산실적 7반"}
			      , { "pageNm": "FmbFactAll", 	"pageNmKr": "반별 생산실적"}
			      , { "pageNm": "FmbFact001", 	"pageNmKr": "1반 생산실적"}
			      , { "pageNm": "FmbFact002",	"pageNmKr": "2반 생산실적"}
			      , { "pageNm": "FmbFact003", 	"pageNmKr": "3반 생산실적"}
			      , { "pageNm": "FmbFact004", 	"pageNmKr": "4반 생산실적"}
			      , { "pageNm": "FmbFact005", 	"pageNmKr": "5반 생산실적"}
			      , { "pageNm": "FmbFact006", 	"pageNmKr": "6반 생산실적"}
			      , { "pageNm": "FmbFact007", 	"pageNmKr": "7반 생산실적"}
			      , { "pageNm": "FmbTbm", 		"pageNmKr": "TBM"     		}
			       ]
	
	self.Setting=[];
	$scope.alarmList=[];
	getAlarmList();
	
	//설비 plc 알람정보 데이터 가져오기
	function getAlarmList(){
		 if($location.url() == '/'+'FmbMode'){ // mode일 경우 알람정보 지우기
	      	 $scope.alarmList = [];
   		}else{
   			var alarmList = [];
   			
   			var plcPromise = CmmAjaxService.select("/fmb/bas/selectFmbPlc.do", self.plcParamVo);
   				var alarmListWdth = 0;
				plcPromise.then(function(data) {
					//console.log(data);
					for (var i = 0; i < data.length; i++) {
						if(data[i].eqptSts3=='4'){ //sts== 0이나 4일경우 하단바에 알람 발생 경고()
							data[i].charLen = String(data[i].lineNm).length; // 라인명 글자수 
							data[i].wdth= data[i].charLen * 14.5 + 311;//(li의 width값 = 글자수 *15px + 311px)
					
							alarmListWdth = alarmListWdth + data[i].wdth + 10; //margin-right:10px
							alarmList.push(data[i]);
						}
					}
					
					$scope.alarmList = alarmList;
					$scope.alarmListLen = $scope.alarmList.length;	// 알람리스트 갯수
					$scope.alarmListWdth = alarmListWdth;
					plcPromise = null;
				}, function(data){
					/*alert('fail: '+ data)*/
					console.log('fail'+data);
				});
   		}
		
	}
		  	
   //알람정보워커
   //Worker3Start();
   defaultLotationSetting();
   
   function defaultLotationSetting(){
	   for(var j =0; j<pageList.length; j++){ // 기본설정값 지정
		   //console.log(pageList[j])
		   	self.Setting[j] = {"pageSeq":j+1, "dataTime": Number(5), "switchNum": Number(1),  "pageNm":pageList[j].pageNm, "pageNmKr":pageList[j].pageNmKr,  "switcher" : true}
		   //console.log(self.Setting[j])
	   }
	   
	   if(localStorage.getItem('SettingTime')!=null){
		   var SettingLS = JSON.parse(localStorage.getItem('SettingTime'));
		  // console.log(self.Setting);
		   for (var i =0; i<pageList.length; i++){
			   for(var k=0; k<SettingLS.length; k++){
				   if(self.Setting[i].pageNm==SettingLS[k].pageNm){
					   self.Setting[i] = {"pageSeq":self.Setting[i].pageSeq, 			//페이지 전환순서
							   //"rotateTime": Number(self.Setting[i].rotateTime), 	//페이지 전환시간
							   "dataTime": Number(SettingLS[k].dataTime),			//페이지 내 데이터 갱신 시간
							   "switchNum": Number(SettingLS[k].switchNum),			//페이지 내 데이터 갱신 횟수
							   "pageNm":SettingLS[k].pageNm, 						//페이지 url
							   "pageNmKr":SettingLS[k].pageNmKr, 					//페이지명
							   "switcher" : SettingLS[k].switcher					//페이지 표시 여부
							   };
				   }
				  
			   }
		   }
		   console.log(self.Setting);
	   }else{
		  	localStorage.setItem('SettingTime', JSON.stringify(self.Setting));		//로컬스토리지 저장
	   }
	   workerList.worker2.data =JSON.parse(localStorage.getItem('SettingTime'));    //worker2의 data로 저장
   }
/*  function defaultLotationSetting(){
	   if(localStorage.getItem('SettingTime')!=null){
		   self.Setting = JSON.parse(localStorage.getItem('SettingTime'));
		   for (var i =0; i<self.Setting.length; i++){
				self.Setting[i] = {"pageSeq":self.Setting[i].pageSeq, 						//페이지 전환순서
								   //"rotateTime": Number(self.Setting[i].rotateTime), 		//페이지 전환시간
								   "dataTime": Number(self.Setting[i].dataTime),			//페이지 내 데이터 갱신 시간
								   "switchNum": Number(self.Setting[i].switchNum),			//페이지 내 데이터 갱신 횟수
								   "pageNm":self.Setting[i].pageNm, 						//페이지 url
								   "pageNmKr":self.Setting[i].pageNmKr, 					//페이지명
								   "switcher" : self.Setting[i].switcher					//페이지 표시 여부
								   };
		   }
	   }else{

		   for(var j =0; j<pageList.length; j++){ // 기본설정값 지정
			   if (j == 2) {
				   	self.Setting[j] = {"pageSeq":j+1, "rotateTime": Number(30), "dataTime": Number(30), "pageNm":pageList[j].pageNm, "pageNmKr":pageList[j].pageNmKr, "switcher" : true}
			   }else {
			   		self.Setting[j] = {"pageSeq":j+1, "rotateTime": Number(10), "dataTime": Number(5), "pageNm":pageList[j].pageNm, "pageNmKr":pageList[j].pageNmKr,  "switcher" : true}
			   }
			   //console.log(self.Setting[j])
			   	self.Setting[j] = {"pageSeq":j+1, "dataTime": Number(10), "switchNum": Number(1),  "pageNm":pageList[j].pageNm, "pageNmKr":pageList[j].pageNmKr,  "switcher" : true}
		   }
		  	localStorage.setItem('SettingTime', JSON.stringify(self.Setting));		//로컬스토리지 저장
	   }
	   workerList.worker2.data =JSON.parse(localStorage.getItem('SettingTime'));    //worker2의 data로 저장
   }*/
   

/*   //설비 plc 알람정보 데이터 가져오기
   var plcPromise = CmmAjaxService.select("/fmb/bas/selectFmbPlc.do", self.plcParamVo);
   self.alarmList = {}
   plcPromise.then(function (data) {
       for (var i = 0; i < data.length; i++) {
           if (data[i].eqptSts == '0') { //sts== 4일경우 하단바에 알람 발생 경고()
               self.alarmList[i] = data[i];
           }
       }
       plcPromise = null;
   }, function (data) {
	   alert('fail: '+ data)
		console.log('fail'+data);
   });
*/
   //페이지 전환설정 submit
   function submitLotationSetting() {
		  var SettingTime = [];
		  var rotationChk= false;	//모든페이지가 off인지 체크하는 변수

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
				   SettingTime[j] = {"pageSeq":j+1,  "dataTime":  Number(self.Setting[j].dataTime), "switchNum":  Number(self.Setting[j].switchNum), "pageNm":pageList[j].pageNm, "pageNmKr":pageList[j].pageNmKr, "switcher" : self.Setting[j].switcher}
			   }
		  		localStorage.setItem('SettingTime', JSON.stringify(SettingTime));
			   for(var i=0; i<localStorage.length; i++){
				   //console.log(localStorage.getItem(localStorage.key(i)));
			   }
			   workerList.worker2.data =JSON.parse(localStorage.getItem('SettingTime'));
			   
			   self.showModal = false;
		   }
		   
		  SettingTime = null;
		  rotationChk = null;
		  
		  //전환설정창을 나갈때 워커 시작.
	    	//workerList.worker2.sts = '';	//페이지 전환 여부  상태(워커스타트)
	    	self.switchPage = workerList.worker2.sts;
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
	    		nextPage = null;
	    		
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
	    		nextPage = null;
	     	}
	    	
	    	curPageSeq = null;
	    	curPage = null;
		    	
		    	
		 
		  
		  //console.log(workerList.worker2)
	   }
   
 	function dataTimeChk(index){
	 		if(self.Setting[index].dataTime<5||self.Setting[index].dataTime==null){
	 			alert("데이터 갱신 시간은 5초 이상이어야합니다.")
	 			self.Setting[index].dataTime=5;
	 		}
	 	}

	function switchNumChk(index){
		if(self.Setting[index].switchNum<1||self.Setting[index].switchNum==null){
			alert("데이터 갱신 횟수는 1회 이상이어야합니다.");
			self.Setting[index].switchNum=2;
		}
		if(String(self.Setting[index].switchNum).lastIndexOf('.')!=-1){
			alert("데이터 갱신 횟수는 정수만 입력가능합니다.")
			self.Setting[index].switchNum=2;
		}
	}

   function btnFmbMonClickHandler() {
         //callParamSetting();
         $location.url('/FmbMon');
      }
   function btnFmbAndonClickHandler() {
       $location.url('/FmbAndon');
    }
      function btnFmbTbmClickHandler() {
         $location.url('/FmbTbm');
      }
      function btnFmbLine001ClickHandler() {
          $location.url('/FmbLine001');
       }
      function btnFmbLine002ClickHandler() {
          $location.url('/FmbLine002');
       }
      function btnFmbLine003ClickHandler() {
          $location.url('/FmbLine003');
       }
      function btnFmbLine004ClickHandler() {
          $location.url('/FmbLine004');
       }
      function btnFmbLine005ClickHandler() {
          $location.url('/FmbLine005');
       }
      function btnFmbLine006ClickHandler() {
          $location.url('/FmbLine006');
       }
      function btnFmbLine007ClickHandler() {
          $location.url('/FmbLine007');
       }
      function btnFmbFactAllClickHandler() {
            $location.url('/FmbFactAll');
         }
      function btnFmbFact001ClickHandler() {
           $location.url('/FmbFact001');
        }
       function btnFmbFact002ClickHandler() {
           $location.url('/FmbFact002');
        }
       function btnFmbFact003ClickHandler() {
           $location.url('/FmbFact003');
        }
       function btnFmbFact004ClickHandler() {
           $location.url('/FmbFact004');
        }
       function btnFmbFact005ClickHandler() {
           $location.url('/FmbFact005');
        }
       function btnFmbFact006ClickHandler() {
           $location.url('/FmbFact006');
        }
       function btnFmbFact007ClickHandler() {
           $location.url('/FmbFact007');
        }
      function btnFmbSpcClickHandler() {
          $location.url('/FmbSpc');
       }
      function btnFmbFactAllClickHandler() {
          $location.url('/FmbFactAll');
       }
      function btnFmbFact001ClickHandler() {
          $location.url('/FmbFact001');
       }
      function btnFmbFact002ClickHandler() {
          $location.url('/FmbFact002');
       }
      function btnFmbFact003ClickHandler() {
          $location.url('/FmbFact003');
       }
      function btnFmbFact004ClickHandler() {
          $location.url('/FmbFact004');
       }
      function btnFmbFact005ClickHandler() {
          $location.url('/FmbFact005');
       }
      function btnFmbFact006ClickHandler() {
          $location.url('/FmbFact006');
       }
      function btnFmbFact007ClickHandler() {
          $location.url('/FmbFact007');
       }
      
      function btnFmbTotalClickHandler() {
          $location.url('/FmbTotal');
       }
      function btnFmbModeClickHandler() {
          $location.url('/FmbMode');
       }
      
      function LotationSetting() {
    	  //전환설정창을 켰을때 워커 stop
          if(workerList.worker2.worker!=undefined){
          	workerList.worker2.worker.terminate();
          	workerList.worker2.worker=undefined; 
          }
  	        
         self.showModal = !self.showModal;
      }
      
  
    //Web Worker1 시작버튼 클릭 이벤트
     /* 워커 시작시 다음페이지로 이동.
      	각페이지에서 워커를 시작함  	*/
    function WorkerStart(){
    	if($scope.loginChk=='true'){
    		
    
    	workerList.worker2.sts = 'on';	//페이지 전환 여부  상태(워커스타트)
    	self.switchPage = workerList.worker2.sts;
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
    		nextPage = null;
    		
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
    		nextPage = null;
     	}
    	
    	curPageSeq = null;
    	curPage = null;
    	}
    	
    }	
    
    //설비plc 데이터 불러오기 Web Worker시작 함수
    function Worker3Start(){
    	console.log("worker3start")
       //브라우저가 웹 워커를 지원하는지 검사한다 .
        if(!!window.Worker){    
           //워커가 이미 존재하면 종료시킨다 .
           if(workerList.worker3.worker!=undefined){
        	   //workerList.worker3.worker.terminate();
        	  // workerList.worker3.worker=undefined;
           }else{
        	   //새로운 워커(객체)를 생성한다.
        	   workerList.worker3.worker= new Worker("worker3.js");       
        	   
        	   //Setting 정보(화면전환 시간(초))를 Worker로 넘긴다.
        	   workerList.worker3.worker.postMessage(6);
        	   
        	   // 워커로부터 전달되는 메시지를 받는다.
        	   workerList.worker3.worker.onmessage = function(evt){ 
        		   //설비 plc 데이터 가져오기
        		   getAlarmList();
        		   //self.alarmListLen = Object.keys($scope.alarmList).length;
        	   }  
           }
           
        }
        else {
          alert("현재 브라우저는 웹 워커를 지원하지 않습니다");
        }
      }

    
    
    /* 로그 아웃 */
    function fnLogout(){
    	
    	
    	//console.log("로그아웃");
    	$scope.id = "";
    	$scope.pw = "";
    	 //로그아웃시 자동 로그인 로컬스토리지 지움
    	if(localStorage.getItem("autoLogin")=="true"){
    		localStorage.removeItem("autoLogin");
    		localStorage.removeItem("id");
        	//localStorage.removeItem("password");
        	$scope.autoLogin = false;
        	}       
    	//세션지움
        sessionStorage.setItem("login", false);
        sessionStorage.removeItem("id");
        $scope.loginChk = false;
        //워커 종료
        if(workerList.worker2.worker!=undefined){
     	   workerList.worker2.worker.terminate();
     	   workerList.worker2.worker=undefined;
        }
        //self.switchPage = "off";
        $location.url('/login');
       // $scope.$apply();
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
	}
	
/*	
	if($scope.loginChk=='false'){
		console.log("로그인false 가라로그인")
		 $location.url('login');	//로그인페이지로 이동
	}*/
	/*$scope.$watch('loginChk', function(newVal, oldVal) {
		console.log('watch', oldVal +"-> " + newVal )
		console.log(newVal=='false')
		console.log(newVal==false)
		
		if(newVal == 'false' || newVal==false){	//로그아웃시
			$location.url('/login');
			   console.log('watch', oldVal +"-> " + newVal )
		}else{
			   $location.url('/FmbMon');
			   console.log('watch', oldVal +"-> " + newVal )
		}    	
	}, true);
   */
	
    /*페이지 처음 들어왔을경우*/
    if(localStorage.getItem("autoLogin")=="true"){ //자동로그인에 체크가 되어있던 경우, 로컬에서 가져와서 세션, 스코프에 저장
 	   console.log("자동로그인트루인경우")
 	   //로컬데이터->세션저장
        sessionStorage.setItem("id", localStorage.getItem('id'));
        sessionStorage.setItem("login", true);
    }			
    
    //세션정보체크
    //console.log("새로고침")
    if(sessionStorage.getItem("login")=='true'||sessionStorage.getItem("login")==true){		//로그인정보 있는경우
 	   console.log("로그인된경우")
 	   $location.url('/FmbMon');//main.html들어올경우 monitering 페이지로 이동
    }else{											//로그인정보 없는경우
 	   console.log("로그인정보 없는경우")
 	   $location.url('/login');
    }


}]);
