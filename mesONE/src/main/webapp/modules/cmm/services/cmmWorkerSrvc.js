/**
 * @Class Name : cmmWorkerSrvc.js
 * @Description : Worker 를 통해 화면 전환, 데이터 처리하는 공통 모듈
 * @Modification Information
 * @  수정일            수정자              수정내용
 * @ ---------------------------------------------------- *
 * @author  
 * @since 2017.06.20
 * @version 1.0
 * @see
*/

'use strict';

angular.module('app').factory('CmmWorkerSrvc',  ['CmmFactSrvc','$location',
					 function(CmmFactSrvc, $location) {
	
	

	// 서비스 목록
    var factory = {
    	worker1 : {worker1:worker1}, 
    	worker2 : {worker2:worker2},
    	worker3 : {worker3:worker3},
    	workerStart : workerStart,
    	workerStop : workerStop,
    	workerOnmessage : workerOnmessage
    	}
	
    var worker1 = {
    		worker : undefined, 
    		data : undefined,
    		sts  : undefined
    }
    var worker2 = {
    		worker : undefined, 
    		data : undefined,
    		sts  : undefined
    }
    var worker3 = {
    		worker : undefined, 
    		data : undefined,
    		sts  : undefined
    }
        	
    
    	//페이지 내에서 데이터를 리로드하는 워커 시작함수
    	function workerStart(workerName, url){
    	     //브라우저가 웹 워커를 지원하는지 검사한다 .
    	var switchPage =  workerName.sts; 	//페이지 전환 여부
	        if(!!window.Worker){    
	           //워커가 이미 존재하면 종료시킨다 .
	           if(workerName.worker!=undefined){
	        	  workerName.worker.terminate();
	        	  workerName.worker=undefined;
	           }      
	           
	           //새로운 워커(객체)를 생성한다.
	           workerName.worker = new Worker(url);       
	           
	           //data를 Worker로 넘긴다.
	           
	           var SettingTime = workerName.data;
	           var obj_length = Object.keys(SettingTime).length;

	           for(var i = 0; i < obj_length; i++){
	        	   if('/'+SettingTime[i].pageNm ==$location.url()){
	        		   workerName.worker.postMessage([SettingTime, i, switchPage]);
	        		   
	        	   }
	           }

	        }
	        else {
	          alert("현재 브라우저는 웹 워커를 지원하지 않습니다");
	        }
    	}
    
    
    function workerOnmessage(workerName, func){
			// 워커로부터 전달되는 메시지를 받는다.
			workerName.worker.onmessage = function(evt){ 
				var switchPage =  workerName.sts; 	//페이지 전환 여부
			    var dataChange = evt.data[0];
				var nextPage = evt.data[1];

	    	if(dataChange){	//true:계속 데이터 갱신  false: worker stop 후 페이지 전환
	        	return func();
	        	//console.log("데이터 갱싱")
	        }else{
	        	if(switchPage=="off"){
	        		//console.log("데이터만")
	        		return func();
				}else{
					//console.log("페이지 전환")
					var pager = JSON.parse(localStorage.getItem('SettingTime'))[nextPage].pageNm;
		        	if(workerName.worker!=undefined){
		  	        	workerName.worker.terminate();
		  	        	workerName.worker=undefined;
			  	    }
		        	
		        	$location.url('/'+pager);
		        	//$scope.$apply();
				}
	        }
	     }  
    	}
    
    
	    //전환 워커 종료
	    function workerStop(workerName){
	        if(workerName.worker!=undefined){
	       /* 	workerName.worker.terminate();
  	        	workerName.worker=undefined; */
	        	workerName.sts = "off";
	        }
	        
	    }
    	
    	return factory;
    }]);
