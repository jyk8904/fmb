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
    .controller('FmbFact007Ctrl'
    		 , ['CmmAjaxService','CmmModalSrvc','CmmWorkerSrvc','$http','$scope','$window','$q','$location', '$filter', '$interval', '$rootScope'
     , function (CmmAjaxService , CmmModalSrvc , CmmWorkerSrvc , $http , $scope , $window , $q , $location, $filter, $interval, $rootScope)
{
	/*------------------------------------------
     * 변수 선언
     *-----------------------------------------*/
    var self = this;
    var workerList = CmmWorkerSrvc;
    $scope.isMobile = false;
    var promise = null;
    self.lineParamVo = {	
        	factId:'007'
        	}
    $rootScope.showBar = $location.url();
    // 모바일 체크 함수 실행
	isMobileFunc();
    
    //워커3(알람정보워커)가 없을경우 start
    //$scope.Worker3Start()
    
  	//워커 스타트
  	workerList.workerStart(workerList.worker, "worker.js");
    //워커 온메세지
	workerList.workerOnmessage(workerList.worker, getData);
  

        function getFactList(){
	    promise = CmmAjaxService.select("bas/selectFmbFact.do",  self.lineParamVo);
	    promise.then(function(data){
	    	self.lineList = data;
	    	//console.log(self.lineList)
	    	promise = null;
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
    	  self.defectttl = 0;
    	  self.goalmonttl =0;
    	  self.countmonttl = 0;
    	  self.defectmonttl = 0;
    	  
    	  getFactList();
      }
}]);

