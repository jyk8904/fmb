/**  
 * @Class Name : fmb006Ctrl.js
 * @Description : fmb006 
 * @Modification Information  
 * @
 * @ 작업일       작성자      내용
 * @ ----------  ---------  -------------------------------
 * @ 2017.05.29  정유경    최초생성
 * @ 
 * 
 */

'use strict';

angular
    .module('app')
    .controller('FmbTbmCtrl'
    		 , ['CmmAjaxService','CmmModalSrvc','CmmWorkerSrvc','$http','$scope','$window','$q','$location'
     , function (CmmAjaxService , CmmModalSrvc , CmmWorkerSrvc , $http , $scope , $window , $q , $location) 
{
	/*------------------------------------------
     * 변수 선언
     *-----------------------------------------*/
    var self = this;
    var workerList = CmmWorkerSrvc;
     	   
    
    getTbmList();
    Worker2Start();
    

    function Worker2Start(){
   	 //브라우저가 웹 워커를 지원하는지 검사한다 .
       if(!!window.Worker){    
          
          //워커가 이미 존재하면 종료시킨다 .
          if(workerList.worker2!=undefined){
       	   workerList.worker2.terminate();
       	   workerList.worker2=undefined;
          }      
          
          //새로운 워커(객체)를 생성한다.
          workerList.worker2= new Worker("worker2.js");       
          
         
          //Setting 정보를 Worker로 넘긴다.
          var SettingTime = workerList.worker2data;
          for(var i =0; i < SettingTime.length; i++){
       	   if('/'+SettingTime[i].pageNm ==$location.url()){
       		   workerList.worker2.postMessage(SettingTime[i]);
       		   console.log(SettingTime[i])
       	   }
          }
	           // 워커로부터 전달되는 메시지를 받는다.
	           		workerList.worker2.onmessage = function(evt){ 
	           			if(workerList.worker2sts=='stop'){
	           				Worker2Start();
	           			}
	           			getTbmList();
	           			
		             }  
       	}
       else {
         alert("현재 브라우저는 웹 워커를 지원하지 않습니다");
       }
     }
    
    function getTbmList(){
    	//TBM데이터 가져오기
    	var promise = CmmAjaxService.selectAll("/mes/bas/selectFmbTbm.do");
    	promise.then(function(data){
    		self.Tbm = data;
    		console.log(self.Tbm);
    	}
    	,function(data){
    		alert('fail: '+ data)
    	});
    }      
}]);

