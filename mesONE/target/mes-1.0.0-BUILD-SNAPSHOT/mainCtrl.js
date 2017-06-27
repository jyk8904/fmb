/**
 * 
 */
'use strict';

angular
.module('app')
.controller('MainCtrl', ['$http', '$scope', '$location', '$timeout','$q','$interval' , function($http, $scope, $location, $timeout, $q, $interval) {
	var worker= undefined;
	var i = 1;
	var self = this;
    self.vo = {
        	PLC_ID: 'PLC-001'
        }
	self.btnFmb001Click = btnFmb001ClickHandler;
	self.btnFmb002Click = btnFmb002ClickHandler;
	self.btnFmb003Click = btnFmb003ClickHandler;
	self.btnFmb004Click = btnFmb004ClickHandler;
	self.btnFmb005Click = btnFmb005ClickHandler;
	self.btnFmb006Click = btnFmb006ClickHandler;	
	self.btnFmbPopupClick = btnFmbPopupClickHandler;	
	self.btnWorkerStart = WorkerStart;
	self.btnWorkerStop = WorkerStop;
	//start();
	
   	function btnFmb001ClickHandler() {
   		$location.url('/Fmb001');
   	}

   	function btnFmb002ClickHandler() {
   		$location.url('/Fmb002');
   	}

   	function btnFmb003ClickHandler() {
   		$location.url('/Fmb003');
   	}

   	function btnFmb004ClickHandler() {
   		$location.url('/Fmb004');
   	}

   	function btnFmb005ClickHandler() {
   		$location.url('/Fmb005');
   	}
   	function btnFmb006ClickHandler() {
   		$location.url('/Fmb006');
   	}

   	function btnFmbPopupClickHandler() {
   		$location.url('/FmbPopup');
   	}

   	
   	
/*   	function start(){
   		
   		var i = 1;
   		$interval(function(){
   		
   			var url = '/Fmb00' + i;
   			alert(url);
   			
   	   		$location.url(url);
   	   		if(i == 5){i=1;}else{i+=1;}
   			}, 3000);
   	}*/
   	
   	
   	
    function WorkerStart(){
        if(!!window.Worker){ //브라우저가 웹 워커를 지원하는지 검사한다    
          if(worker!=undefined){
        	  WorkerStop();
          }   //워커가 이미 존재하면 종료시킨다        
	          worker= new Worker("worker.js");//새로운 워커(객체)를 생성한다       
	          var url = $location.absUrl();
	          worker.postMessage(url.split('#/')[1]);//워커에게 메세지 전달

	          worker.onmessage = function(evt){ //워커로부터 전달되는 메시지를 받는다
	        	  var page = evt.data
	        	  console.log('보내진 페이지'+page);
	        	  
	        	  $location.url('/'+page);
	          }
        }
        else{
          alert("현재 브라우저는 웹 워커를 지원하지 않습니다")
        }
      }
	
    function WorkerStop(){
        if(worker!=undefined){
          worker.terminate();
          worker=undefined;
        }
   }
	
}]);

