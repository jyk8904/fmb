/**  
 * @Class Name : fmbTbmCtrl.js
 * @Description : fmbTbm
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
    		 , ['CmmAjaxService','CmmModalSrvc','CmmWorkerSrvc','$http','$scope','$window','$q','$location' ,'$rootScope'
     , function (CmmAjaxService , CmmModalSrvc , CmmWorkerSrvc , $http , $scope , $window , $q , $location, $rootScope) 
{
	/*------------------------------------------
     * 변수 선언
     *-----------------------------------------*/
   
    var self = this;
    var workerList = CmmWorkerSrvc;
    $scope.isMobile = false;   
    var promise = null;
    $rootScope.showBar = $location.url();
    // 모바일 체크 함수 실행
	isMobileFunc();
	//워커3(알람정보워커)가 없을경우 start
    //$scope.Worker3Start()
	//데이터 가져오기
    getTbmList();
    
	//워커 스타트
	workerList.workerStart(workerList.worker, "worker.js");
	//워커 온메세지
	workerList.workerOnmessage(workerList.worker, getTbmList);
	   
	
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
	
	//TBM데이터 가져오기
    function getTbmList(){
    	promise = CmmAjaxService.selectAll("bas/selectFmbTbm.do");
    	promise.then(function(data){
    		self.Tbm = data;
    		promise = null;
    	}
    	,function(data){
    		console.log('fail'+data);
    		//alert('fail: '+ data)
    	});
    }      
}]);

