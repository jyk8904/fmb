/**  
 * @Class Name : fmbProdCtrl.js
 * @Description : fmbProd
 * @Modification Information  
 * @ 생산실적 외 모니터링
 * @ 작업일       작성자      내용
 * @ ----------  ---------  -------------------------------
 * @ 2017.08.14  조준연, 정유경    최초생성
 * @ 
 * 
 */

'use strict';

angular
    .module('app')
    .controller('FmbFact005Ctrl'
    		 , ['CmmAjaxService','CmmModalSrvc','CmmWorkerSrvc','$http','$scope','$window','$q','$location', '$filter', '$interval'
     , function (CmmAjaxService , CmmModalSrvc , CmmWorkerSrvc , $http , $scope , $window , $q , $location, $filter, $interval)
{
	/*------------------------------------------
     * 변수 선언
     *-----------------------------------------*/
	 $scope.$watch('loginChk', function(newVal, oldVal) {
			if(newVal == false){
				$location.url('');
			}    	
		}, true);

    var self = this;
    var workerList = CmmWorkerSrvc;
    $scope.isMobile = false;
    self.lineParamVo = {	
        	factId:'005'
        	}
    // 모바일 체크 함수 실행
	isMobileFunc();
   
  	//워커 스타트
  	workerList.workerStart(workerList.worker2, "worker.js");
    //워커 온메세지
  	workerList.workerOnmessage(workerList.worker2, getData);
      /*workerList.workerOnmessage(workerList.worker2, function(){console.log('onmessage')});*/
  	// 워커에게서 메세지를 받을때마다 페이지 전환
  	var SettingTime = workerList.worker2.data 
  	for(var i =0; i < SettingTime.length; i++){
		console.log(SettingTime[i]);
		if('/'+ SettingTime[i].pageNm== $location.url()){
			var thisDataTime= SettingTime[i].dataTime * 1000
			console.log(thisDataTime)
			break;
		}
	}  
        function getLineList(){
	    var promise = CmmAjaxService.select("/mes/bas/selectFmbLine.do",  self.lineParamVo);
	    promise.then(function(data){
	    	self.lineList = data;
	    	console.log(data)
	    	console.log(self.lineList)
	     }
	    ,function(data){
	    	console.log('fail: '+ data)
	    });
    }
    
    getData();
    
	// 모바일 체크 함수 정의
	function isMobileFunc(){
		var UserAgent = navigator.userAgent;

		if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null)
		{
			$scope.isMobile = true;
		}else{
			$scope.isMobile =  false;
		}
	}
	      
      
      function getData(){
    	  self.goalttl =0;
    	  self.countttl = 0;
    	  self.ratettl= 0;
    	  self.defectttl = 0;
    	  self.ppmttl = 0;
    	  getLineList();
      }
}]);

