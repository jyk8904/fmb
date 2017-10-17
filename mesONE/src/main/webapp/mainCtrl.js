/**
 * @Class Name : mainCtrl.js
 * @Description : main.html
 * @Modification Information  
 * @
 * 
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
                       , '$animateCss'
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
                                 , $animateCss
                                 ) {

    var self = this;
	var workerList = CmmWorkerSrvc;
	
	workerList.worker.sts = 'on'; //페이지 순환여부	on:자동순환 off:정지
	self.switchPage = workerList.worker.sts;
	var winwin;
	$scope.isMobile = false;
   $scope.login = fnLogin;
   $scope.logOut = fnLogout;
   $scope.winClose = fnWinClose;
   $scope.loginChk = false;
   $scope.keyUpLogin = onKeyupPasswd;
   $scope.scroll = true;
   $scope.duration = 60000;
   $scope.getAlarmList = getAlarmList;
   $scope.loginChk = sessionStorage.getItem("login")
   $scope.showBar1 = true;
   $rootScope.showBar = $location.url();
   	//세션정보체크
   	if($scope.loginChk==undefined || $scope.loginChk==false||$scope.loginChk=="false"){	//세션정보가 없음
   		//로컬정보체크
   	   if(localStorage.getItem("autoLogin")=="true"||localStorage.getItem("autoLogin")==true){ //자동로그인에 체크가 되어있던 경우, 로컬에서 가져와서 세션에 저장
   		   sessionStorage.setItem("id", localStorage.getItem('id'));
   		   sessionStorage.setItem("login", true);
   		   self.id= sessionStorage.getItem("id")//로그인
   		   $scope.loginChk= true;
   		   $location.url('/FmbMon')
   	   }else{//세션정보없고, 자동로그인 아님
   		  //로그인페이지으로 이동
   		   $scope.loginChk = false;
   		   $location.url('/');
   	   }
   		
   	}else{//세션정보가 있는경우
   		self.id = sessionStorage.getItem("id");
   		$scope.loginChk=true;
   		$location.url('/FmbMon')
   	}
   	
   	//개발모드일경우 알람바 미표시
   $rootScope.$watch('showBar', function(newVal){
	   if(newVal=='/FmbMode'){
		$scope.showBar1 = false;  
	  }else{
		  $scope.showBar1 = true;  
	  }
   });
	// 모바일 체크 함수 실행
	isMobileFunc();
    
	self.alarmListLen = {};
	self.plcParamVo = {};
	self.plcParamVo.plcId = '';
	self.plcParamVo.factId = '';
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
	self.btnFmbSpcClick = btnFmbSpcClickHandler;
	self.btnFmbTotalClick = btnFmbTotalClickHandler;
	self.btnFmbModeClick = btnFmbModeClickHandler;
	self.btnWorkerStart = WorkerStart;
	self.btnWorkerStop = function () { workerList.workerStop(workerList.worker); self.switchPage = "off"}
   	self.LotationSetting = LotationSetting;
   	self.submit1 = submitLotationSetting;
   	
   	self.switchNumChk= switchNumChk;
   	self.dataTimeChk= dataTimeChk;
   	
    self.onSwipeRight = function() {
        $mdSidenav('left1').open();
    };
 
   	 	function fnWinClose() {
		$window.close();
		   	 //setTimeout(function(){
		   	    var win = window.open(location, '_self', '');
		   	    win.close();
		   	    return false;
		   	    // }, 100);
   	   	}

  /* 	$scope.onSwipeLeft = toggleLeft;*/
    	
    function toggleLeft() {
    	
          $mdSidenav('left1').close();
    };
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
   			var alarmList = [];
   			var plcPromise = CmmAjaxService.select("bas/selectFmbPlc.do", self.plcParamVo);
   				var alarmListWdth = 0;
				plcPromise.then(function(data) {
					//test용 random값 지정
					for(var i = 0; i< data.length; i++){
	               		var random = Math.floor(Math.random()*5);
	               		data[i].eqptSts3 = random;
	           		}
					for (var i = 0; i < data.length; i++) {
						if(data[i].eqptSts3=='4'){ //sts== 0이나 4일경우 하단바에 알람 발생 경고()
							data[i].charLen = String(data[i].lineNm).length; // 라인명 글자수 
							data[i].wdth= data[i].charLen * 14.5 + 311;//(li의 width값 = 글자수 *15px + 311px)
							alarmListWdth = alarmListWdth + data[i].wdth + 10; //margin-right:10px
							alarmList.push(data[i]);
						}
					}
					$scope.screenWdth = $window.innerWidth;
					$scope.alarmListLen = $scope.alarmList.length;	// 알람리스트 갯수
					$scope.alarmListWdth = alarmListWdth;
					$scope.alarmList = alarmList;
					plcPromise = null;
				}, function(data){
					console.log('fail'+data);
				});
	}
   defaultLotationSetting();
   function defaultLotationSetting(){
	   for(var j =0; j<pageList.length; j++){ // 기본설정값 지정
		   //console.log(pageList[j])
		   	self.Setting[j] = {"pageSeq":j+1, "dataTime": Number(10), "switchNum": Number(1),  "pageNm":pageList[j].pageNm, "pageNmKr":pageList[j].pageNmKr,  "switcher" : true}
		  //console.log(self.Setting[j])
	   }
	   
	   if(localStorage.getItem('SettingTime')!=null){
		   var SettingLS = JSON.parse(localStorage.getItem('SettingTime'));
		   //console.log(self.Setting);
		   for (var i =0; i<pageList.length; i++){
			   for(var k=0; k<SettingLS.length; k++){
				   if(self.Setting[i].pageNm==SettingLS[k].pageNm){
					   self.Setting[i] = {"pageSeq":self.Setting[i].pageSeq, 		//페이지 전환순서
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
		  //console.log(self.Setting);
	   }else{
		  	localStorage.setItem('SettingTime', JSON.stringify(self.Setting));		//로컬스토리지 저장
	   }
	   workerList.worker.data =JSON.parse(localStorage.getItem('SettingTime'));    //worker의 data로 저장
   }
   
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
		  }else{
			  for(var j =0; j<pageList.length; j++){
				   SettingTime[j] = {"pageSeq":j+1,  "dataTime":  Number(self.Setting[j].dataTime), "switchNum":  Number(self.Setting[j].switchNum), "pageNm":pageList[j].pageNm, "pageNmKr":pageList[j].pageNmKr, "switcher" : self.Setting[j].switcher}
			   }
		  		localStorage.setItem('SettingTime', JSON.stringify(SettingTime));
			   for(var i=0; i<localStorage.length; i++){
			   }
			   workerList.worker.data =JSON.parse(localStorage.getItem('SettingTime'));
			   self.showModal = false;
		   }
		   
		  SettingTime = null;
		  rotationChk = null;
		  
		  //전환설정창을 나갈때 워커 시작.
	    	//workerList.worker.sts = '';	//페이지 전환 여부  상태(워커스타트)
	    	self.switchPage = workerList.worker.sts;
	    	var curPageSeq;			
	    	var curPage = $location.url();
	    	for(var i = 0; i<pageList.length; i++){
	    		if(curPage == '/'+pageList[i].pageNm){
	    			curPageSeq = i; //현재 페이지 seq
	    		}
	    	}
	    	
	    	if(curPageSeq==undefined){ 	//메인페이지에서 시작할경우, 바로 첫페이지로 이동
	    		curPageSeq = 0;
	    		while(workerList.worker.data[curPageSeq].switcher == false){
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
	    		while(workerList.worker.data[curPageSeq].switcher == false){
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
          if(workerList.worker.worker!=undefined){
          	workerList.worker.worker.terminate();
          	workerList.worker.worker=undefined; 
          }
         self.showModal = !self.showModal;
      }
      
  
    //Web Worker1 시작버튼 클릭 이벤트
     /* 워커 시작시 다음페이지로 이동.
      	각페이지에서 워커를 시작함  	*/
    function WorkerStart(){
    	workerList.worker.sts = 'on';	//페이지 전환 여부  상태(워커스타트)
    	self.switchPage = workerList.worker.sts;
    	var curPageSeq;			
    	var curPage = $location.url();
    	for(var i = 0; i<pageList.length; i++){
    		if(curPage == '/'+pageList[i].pageNm){
    			curPageSeq = i; //현재 페이지 seq
    		}
    	}
    	if(curPageSeq==undefined){ 	//메인페이지에서 시작할경우, 바로 첫페이지로 이동
    		curPageSeq = 0;
    		while(workerList.worker.data[curPageSeq].switcher == false){
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
    		while(workerList.worker.data[curPageSeq].switcher == false){
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
    
    /*로그인*/
	var key = "DsInfoFramework*DsInfoFramework*";

    function AES_Encode(plain_text)
	{
		GibberishAES.size(256);	
		return GibberishAES.aesEncrypt(plain_text, key);
	}

	function AES_Decode(base64_text)
	{
		GibberishAES.size(256);	
		return GibberishAES.aesDecrypt(base64_text, key);
	}
	String.prototype.trim = function() {
	    return this.replace(/(^\s*)|(\s*$)/gi, "");
	}
	
    function fnLogin(){
        var objAutoLogin= self.autoLogin; //로그인 여부 저장 변수
    	var objLogin = {userId : self.id , userPw: self.pw} //사용자 입력 로그인 정보
    	var encodeLogin = {userId : null, userPw: AES_Encode(objLogin.userPw)}			//암호화 로그인 정보
    	var dbLogin = {userId : null, userPw: null}				//db 로그인 정보
    	
    	if(objLogin.userId == undefined || objLogin.userId==""){
            alert("아이디를 입력하세요");
            self.focusId = true;
            return ;
        }
        else if(objLogin.userPw == undefined || objLogin.userPw ==""){
            alert("비밀번호를 입력하세요");
            self.focusPw = true;
            return ;
        }
    	
        var loginPromise = CmmAjaxService.select("bas/fmbLogin.do", {userId:objLogin.userId});
			
		loginPromise.then(function(data) {
			if(data[0]==undefined){
				alert("아이디와 비밀번호를 확인하세요");
	        	return;
			}else{
				dbLogin.userPw = data[0].userPw;
				dbLogin.userId = data[0].userId;

			      // 아이디, 패스워드 체크
		        if(encodeLogin.userPw.toString().trim() == dbLogin.userPw.toString().trim()){
		        	//자동로그인시 로컬스토리지 저장
		        	if(objAutoLogin ==true 
		        		&& (localStorage.getItem("autoLogin")==null 
		        				|| localStorage.getItem("autoLogin")=="false")){ //자동로그인 체크
		            	localStorage.setItem("autoLogin", true);
		            	localStorage.setItem("id", objLogin);
		        	}
		        	 //세션저장
		            sessionStorage.setItem("id", dbLogin.userId);
		            sessionStorage.setItem("login", true);	          
		            btnFmbMonClickHandler();
		            
		            if(sessionStorage.getItem("login")=="true"){
		                $scope.loginChk = true;
		            }

		        }else{
		        	alert("아이디와 비밀번호를 확인하세요");
		        	return;
		        }
			}
			loginPromise = null;
		}, function(data){
			alert("아이디와 비밀번호를 확인하세요");
        	return;
		});
	
  

    }
    /* 로그 아웃 */
    function fnLogout(){
    	//console.log("로그아웃");
    	
    	self.id = "";
    	self.pw = "";
    	
    	 //로그아웃시 자동 로그인 로컬스토리지 지움
    	if(localStorage.getItem("autoLogin")=="true"){
    		localStorage.removeItem("autoLogin");
    		localStorage.removeItem("id");
        	//localStorage.removeItem("password");
        	self.autoLogin = false;
        	}       
    	//세션지움
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
        evKeyup = null;
    } 

    // 모바일 체크 함수 정의
	function isMobileFunc(){
		var UserAgent = navigator.userAgent;

		if (UserAgent.match(/iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null)
		{
			$scope.isMobile = true;
		}else{
			$scope.isMobile =  false;
		}
	}
}]);
