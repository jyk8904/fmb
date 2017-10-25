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

angular.module('app').factory('CmmWorkerSrvc',  ['CmmFactSrvc','$rootScope', '$location',
										function( CmmFactSrvc,$rootScope, $location) {
	// 서비스 목록
    var factory = {
    	worker : {worker:worker},
    	workerStart : workerStart,
    	workerStop : workerStop,
    	workerOnmessage : workerOnmessage
    	}
 
    var worker = {
		worker : undefined, 
		data : undefined,
		sts  : undefined
	    };

    function workerStart(workerName, url){
    	var switchPage =  workerName.sts; 	//페이지 전환 여부
	        if(!!window.Worker){   	
	        	//워커가 이미 존재할경우  워커종료 
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
	        		   //console.log("workerSrvc:post")
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
			    var dataChange = evt.data[0];		//페이지 전환횟수 달성여부 false:다음페이지로 전환, true: 데이터갱신계속한다
				var nextPage = evt.data[1];
	    	if(dataChange==true){	//true:계속 데이터 갱신  false: worker stop 후 페이지 전환
	    		//console.log("workerSrvc:데이터갱신")
	    		return func();
	        }else{
	        	if(switchPage=="off"){
	        		//console.log("workerSrvc:페이지 전환없이 데이터만 갱신")
	        		return func();
				}else{
					var pager = JSON.parse(localStorage.getItem('SettingTime'))[nextPage].pageNm;
		        	if(workerName.worker!=undefined){
		        		workerName.worker.terminate();
		        		workerName.worker=undefined;
			  	    }
		        	//console.log("workerSrvc:"+pager+"로 페이지 전환")
		        	AmCharts.clear();
		        	//AmCharts = null;
		           	$location.url('/'+pager);
		        	$rootScope.$apply();
				}
	        }
	     }  
    	}
    
	    //전환 워커 종료
	    function workerStop(workerName, url){
	        if(workerName.worker!=undefined){
	        	workerName.worker.terminate();
	        	workerName.worker=undefined; 
	        	workerName.worker= new Worker(url)
	        }
	    }
    	return factory;
    }]);
