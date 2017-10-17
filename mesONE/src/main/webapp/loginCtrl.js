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
.controller('LoginCtrl', ['$http'
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
	//workerList.worker.sts = 'off'; //페이지 순환여부	
	//self.switchPage = workerList.worker.sts;
	
	
	$scope.isMobile = false;
    $scope.login = fnLogin;
    $scope.winClose = fnWinClose;


    
    /*로그인 버튼 클릭*/
    function fnLogin(){
    	console.log($scope.id)
        var objLogin = $scope.id 			//id 저장 변수	
        var objPasswd = $scope.pw;			//pw 저장 변수
        var objAutoLogin= $scope.autoLogin; //로그인 여부 저장 변수
       
        //빈칸체크
        if(objLogin == undefined || objLogin==""){
            alert("아이디를 입력하세요");
            self.focusId = true;
            return ;
        }else if(objPasswd == undefined || objPasswd==""){
            alert("비밀번호를 입력하세요");
            self.focusPw = true;
            return ;
        }
        // 서버로 전송
        
        /*******************************/
        /** id, pw 가져오는거 코딩해야함   */
        /*******************************/
        
        
        // 아이디, 패스워드 체크
        if(((objLogin =="aaa"|| objLogin =="admin") && objPasswd =="bbb") || (objLogin=="CTR" && objPasswd=="ctr")){//맞는경우
        	//console.log("로그인")
        	//console.log(objAutoLogin);
        	//console.log(localStorage.getItem("autoLogin"))
        	if(objAutoLogin == true 
        		&& (localStorage.getItem("autoLogin")==null
        		|| localStorage.getItem("autoLogin")=="false")){ //자동로그인 체크한경우 로컬스토리지에 저장 
            	localStorage.setItem("autoLogin", true);
            	localStorage.setItem("id", objLogin);
        	}
        	//로그인 성공시 세션저장
            sessionStorage.setItem("id", objLogin);
            sessionStorage.setItem("login", true);
            $scope.loginChk = true;
            $location.url('/FmbMon');
        }else{																										//로그인정보틀린경우
        	alert("아이디와 비밀번호를 확인하세요");
        	return;
        }
        objLogin = null;
        objPasswd = null;
        objAutoLogin = null;
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
    
    function fnWinClose() {
	   	 setTimeout(function(){
	   	     window.open('', '_self', '');
	   	     this.window.close();
	   	 }, 100);
	   	}
}]);
