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
	 $scope.$watch('loginChk', function(newVal, oldVal) {
			if(newVal == false){
				$location.url('');
			}    	
		}, true);

    
    var self = this;
    var workerList = CmmWorkerSrvc;
     	   
    
    getTbmList();
	//워커 스타트
	workerList.workerStart(workerList.worker2, "worker2.js", getTbmList);
    
 
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

