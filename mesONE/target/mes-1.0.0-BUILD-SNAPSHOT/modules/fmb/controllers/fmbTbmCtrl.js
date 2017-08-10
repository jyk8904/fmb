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
    $scope.isMobile = false;   
    
    // 모바일 체크 함수 실행
	isMobileFunc();
    
    getTbmList();
    
	//워커 스타트
	workerList.workerStart(workerList.worker2, "worker2.js", getTbmList);
    
	
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

